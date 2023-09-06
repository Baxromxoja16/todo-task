import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = 'https://joldibaev.uz/api/'

  constructor(private http: HttpClient) {}

  login(data: User) {
    return this.http.post(this.baseUrl + 'auth/token/login/', data)
  }
}
