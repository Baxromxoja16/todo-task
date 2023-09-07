import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { ListOfUsers, UserModel } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  baseUrl = 'https://joldibaev.uz/api/'
  token = localStorage.getItem('token');
  todoChanged = new Subject<UserModel[]>();

  listItems: Observable<ListOfUsers> = of<ListOfUsers>({
    count: 7,
    next: null,
    previous: null,
    results: [
      {
        id: "6825e2d2-181d-4f4e-85c1-f7c8744db808",
        title: "Check email on daily basis",
        completed: true,
        created_at: "2023-08-19T16:19:00.247337+05:00",
        updated_at: "2023-08-29T20:36:11.196543+05:00",
        user: 1
      },
      {
        id: "6825e2d2-181d-4f4e-85c1-f7c8dawsddad",
        title: "Check email on daily basis",
        completed: true,
        created_at: "2023-08-19T16:19:00.247337+05:00",
        updated_at: "2023-08-29T20:36:11.196543+05:00",
        user: 1
      },
      {
        id: "6825e2d2-181d-4f4e-85c1-f7a874asdssdw",
        title: "Check email on daily basis",
        completed: true,
        created_at: "2023-08-19T16:19:00.247337+05:00",
        updated_at: "2023-08-29T20:36:11.196543+05:00",
        user: 1
      },
    ]
  })

  constructor(private http: HttpClient) { }

  getTodos() {
    return this.http.get<ListOfUsers>(this.baseUrl + 'todo', { headers: this.headers });
  }

  createTodo(data: UserModel) {
    return this.http.post(this.baseUrl + 'todo', data, { headers: this.headers });
  }

  editTodo(id: string, data: UserModel) {
    return this.http.put(this.baseUrl + 'todo/' + id, data, { headers: this.headers });
  }

  deleteTodo(id: string) {
    return this.http.post(this.baseUrl + 'todo/' + id, { headers: this.headers });
  }

  get headers() {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json;');
    headers.set('Authorization', `Token ${this.token}`);
    return headers
  }
}
