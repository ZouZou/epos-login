import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { exhaustMap, map, Observable, of, switchMap, take, tap } from 'rxjs';
import { environment as env } from '../../environments/environment';
import { AppStateInterface } from '../types/appState.interfcase';
import { LocalStorageService } from './local-storage.service';
import * as UserActions from '../store/actions';
import * as fromStore from "../store/selectors";
import { AccountService } from './account.service';
import { Router } from '@angular/router';

export interface Token {
  access_token: string;
  token_type: string;
  expires_in: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
    private store: Store<AppStateInterface>,
    private localStorageService: LocalStorageService,
    private accountService: AccountService,
    private router: Router) { }

  authorizeApp(): Observable<string> {
    const body = new URLSearchParams();
    body.set('grant_type', `${env.grantType}`);
    body.set('client_id', `${env.clientId}`);
    body.set('client_secret', `${env.clientSecrect}`);
    body.set('scope', `${env.scope}`);
    let options = {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      )
    };
    return this.http.post<Token>(`${env.tokenApiUrl}${env.tokenUrl}`, body.toString(), options)
      .pipe(
        map(token => token.access_token),
        tap(token => {
          this.setAuthToken(token);
          return token;
        }));
  }

  setAuthToken(token: string) {
    this.store.dispatch(UserActions.setToken({ token: token }));
  }

  getAuthToken(): Observable<string> {
    let token: string = "";
    this.store.select(fromStore.getToken).pipe(
      take(1), 
      map((value) => token = (value ? value : ""))
    );
    if (token == "") token = this.localStorageService.getItem('accessToken');
    if ((token == "") || (token == null)) {
      this.authorizeApp().subscribe(
        value => token = value
      )
      this.logoutAndRedirect();
    }
    return of(token);
  }

  logoutAndRedirect() {
    this.accountService.logout();
    this.router.navigateByUrl('/login');
  }
}
