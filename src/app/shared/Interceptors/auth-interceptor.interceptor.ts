import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interfcase';
import * as UserActions from '../../store/actions';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {
  private refreshingInProgress: boolean = false;
  private accessTokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor(private authService: AuthService, 
    private accountService: AccountService,
    private localStorageService: LocalStorageService, 
    private router: Router,
    private store: Store<AppStateInterface>) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.indexOf('connect/token') > -1) return next.handle(request);

    let accessToken: string = ""; 
    this.authService.getAuthToken().subscribe(token => {
      accessToken = token;
      if ((accessToken != "") && (accessToken != null)) {
        return next.handle(this.addAuthorizationHeader(request, accessToken)).pipe(
          catchError(err => {
            // in case of 401 http error
            if (err instanceof HttpErrorResponse && err.status === 401) {
              // get refresh tokens
              const refreshToken = this.localStorageService.getItem('accessToken');
    
              // if there are tokens then send refresh token request
              if (refreshToken && accessToken) {
                return this.refreshToken(request, next);
              }
    
              // otherwise logout and redirect to login page
              return this.logoutAndRedirect(err);
            }
    
            // // in case of 403 http error (refresh token failed)
            if (err instanceof HttpErrorResponse && err.status === 403) {
              // logout and redirect to login page
              return this.logoutAndRedirect(err);
            }
            // if error has status neither 401 nor 403 then just return this error
            const error = err.error.message || err.statusText;
            return throwError(() => new Error(error));
          })
        );      
      } else {
        this.authService.logoutAndRedirect();
        return next.handle(request);
      }
    }); 
    return next.handle(request);
  }

  private addAuthorizationHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
    if (token) {
      return request.clone({setHeaders: {Authorization: `Bearer ${token}`}});
    }

    return request;
  }

  private logoutAndRedirect(err: any): Observable<HttpEvent<any>> {
    this.accountService.logout();
    this.router.navigateByUrl('/login');

    return throwError(() => new Error(err));
  }

  private refreshToken(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.refreshingInProgress) {
      this.refreshingInProgress = true;
      this.accessTokenSubject.next("");

      return this.authService.authorizeApp().pipe(
        switchMap((accessToken) => {
          this.refreshingInProgress = false;
          this.accessTokenSubject.next(accessToken);
          // repeat failed request with new token
          return next.handle(this.addAuthorizationHeader(request, accessToken));
        })
      );
    } else {
      // wait while getting new token
      return this.accessTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(token => {
          // repeat failed request with new token
          return next.handle(this.addAuthorizationHeader(request, token));
        }));
    }
  }
}
