import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListOfUsers, UserModel } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  baseUrl = 'https://joldibaev.uz/api/'
  token = localStorage.getItem('token');

  constructor(private http: HttpClient) { }

  getListOfUsers() {
    return this.http.get<ListOfUsers>(this.baseUrl + 'todo');
  }

  postTodo(data: UserModel) {
    return this.http.post(this.baseUrl + 'todo', data, {headers: this.headers});
  }

  get headers() {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json;');
    headers.set('Authorization', `Token ${this.token}`);
    return headers
  }
}
