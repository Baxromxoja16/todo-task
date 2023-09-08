import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { ListOfUsers, UserModel } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  baseUrl = '/api/todo'
  token = localStorage.getItem('token');
  todoChanged = new Subject<UserModel[]>();
  todoListChanged = new Subject<ListOfUsers>();

  listItems: Subject<ListOfUsers> = new Subject<ListOfUsers>()

  constructor(private http: HttpClient) { }

  getTodos() {
    return this.http.get<ListOfUsers>(this.baseUrl);
  }

  getDetailTodo(id: string) {
    return this.http.get<UserModel>(this.baseUrl + '/' + id);
  }

  createTodo(data: UserModel) {
    return this.http.post(this.baseUrl, data);
  }

  editTodo(id: string, data: UserModel) {
    return this.http.put(this.baseUrl + '/' + id, data);
  }

  deleteTodo(id: string) {
    return this.http.delete(this.baseUrl + '/' + id);
  }

}
