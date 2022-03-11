import {Injectable, OnDestroy} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {exhaustMap, take} from 'rxjs/operators';
import {AuthService} from "../services/auth.service";
import {Observable, Subscription} from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.authenticatedUserSubject.pipe(
      take(1),
      exhaustMap(authUser => {
        let modifiedReq = request;
        if(authUser) {
          modifiedReq = request.clone({headers: request.headers.append('Authorization', authUser.token.type+' '+authUser.token.token)});
        }
        return next.handle(modifiedReq);
      })
    );
  }
}
