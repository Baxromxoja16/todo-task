import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListOfUsers, UserModel } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  baseUrl = 'https://joldibaev.uz/api/'

  constructor(private http: HttpClient) { }

  getListOfUsers() {
    return this.http.get<ListOfUsers>(this.baseUrl + 'todo');
  }

  postTodo(data: UserModel) {
    return this.http.post(this.baseUrl + 'todo', data);
  }
}
