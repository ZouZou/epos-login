import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/internal/operators/map';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;
  
  constructor(
    private router: Router,
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
      this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
      this.user = this.userSubject.asObservable();
  }

  login(username: string, password: string) {
    return this.http.post<User>(`/api/authenticate`, { username, password })
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            // this.localStorageService.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
            return user;
        }));
  }
  
  changePassword(username: string, password: string) {
    return this.http.post<User>(`${environment.apiUrl}/users/changepassword`, { username, password })
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            // this.localStorageService.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
            return user;
        }));
  }

  logout() {
    this.localStorageService.removeItem('accessToken');
    this.localStorageService.removeItem('refreshToken');
  }
}
