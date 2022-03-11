import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthenticatedUser, AuthService} from "../../services/auth.service";
import {User} from "../../models/user.model";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if(!authForm.valid) {
      return ;
    }
    this.isLoading = true;
    let user: User = {
      email: authForm.value.email
    }
    if(!this.isLoginMode) {
      user.firstName = authForm.value.firstName;
      user.lastName = authForm.value.lastName;
    }
    const password = authForm.value.password;

    let authObservable: Observable<AuthenticatedUser>;

    if(this.isLoginMode) {
      authObservable = this.authService.login(user.email, password).pipe(tap(user => {
        if(this.authService.isValidToken(user.token)) {
          this.router.navigate(['/']);
        }
      }));
    } else {
      authObservable = this.authService.signUp(user, password);
    }

    authObservable.subscribe(
      responseData => {
        this.isLoading = false;
        console.log(responseData);
      },
      error => {
        this.isLoading = false;
        this.error = error;
        console.log(error);
      }
    );

    console.log(authForm);
    authForm.reset();
  }
}
