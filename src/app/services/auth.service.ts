import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {User} from "../models/user.model";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, throwError} from "rxjs";
import {Router} from "@angular/router";

export interface JwtToken {
  token: string;
  expirationDate: Date;
  type?: string;
}

export interface AuthenticatedUser {
  user: User;
  token?: JwtToken;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{

  USER_DATA_STORAGE_KEY: string = 'authenticatedUserData';

  authUrl = 'api/auth'
  private tokenExpirationTimer;
  authenticatedUserSubject: BehaviorSubject<AuthenticatedUser> = new BehaviorSubject(null);

  constructor(private http: HttpClient,
              private router: Router) { }

  ngOnInit() {
  }

  signUp(user: User, password: string) {
    return this.http.post<AuthenticatedUser>(this.authUrl+'/signup',
      {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: password
      }).pipe(catchError(this.handleError));
  }

  login(email: string, password: string) {
    return this.http.post<AuthenticatedUser>(this.authUrl+'/login',
      {
        email: email,
        password: password
      }).pipe(catchError(this.handleError), tap(responseData => {
        responseData.token = {
          token: responseData.token.token,
          type: responseData.token.type,
          expirationDate: new Date(responseData.token.expirationDate)
        };
      this.handleAuthentication(responseData);
    }));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknow error has occured!';
    if(errorRes.error && errorRes.error.message) {
      errorMessage = errorRes.error.message;
    }
    return throwError(() => new Error(errorMessage));
  }

  private handleAuthentication(authenticatedUser: AuthenticatedUser) {
    this.authenticatedUserSubject.next(authenticatedUser);
    const expirationDuration = authenticatedUser.token.expirationDate.getTime() - new Date().getTime();
    this.autoLogout(expirationDuration);
    localStorage.setItem(this.USER_DATA_STORAGE_KEY, JSON.stringify(authenticatedUser));
  }

  logout() {
    this.authenticatedUserSubject.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem(this.USER_DATA_STORAGE_KEY);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogin() {
    const userData: AuthenticatedUser = JSON.parse(localStorage.getItem(this.USER_DATA_STORAGE_KEY));
    if(!userData) {
      return;
    }
    userData.token.expirationDate = new Date(userData.token.expirationDate);
    if(this.isValidToken(userData.token)) {
      this.authenticatedUserSubject.next(userData);
      const expirationDuration = userData.token.expirationDate.getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDate: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDate);
  }

  isValidToken(jwtToken: JwtToken) {
    if(!jwtToken) {
      return false;
    }
    return jwtToken.token && (jwtToken.expirationDate > new Date());
  }
}
