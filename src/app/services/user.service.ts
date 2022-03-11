import {EventEmitter, Injectable, OnInit} from '@angular/core';
import { User } from "../models/user.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit{
  endpoint = 'api/user';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  getUsers() {
    return this.http.get<User[]>(this.endpoint);
  }

  getUser(email: string) {
    return this.http.get<User>(this.endpoint, {params: new HttpParams().set('email', email)});
  }
}
