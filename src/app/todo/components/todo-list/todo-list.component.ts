import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandlingService } from 'src/app/core/services/error-handling.service';
import { ListOfUsers, UserModel } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, OnDestroy {
  listOfUsers!: ListOfUsers;
  errorMessage = ''
  editTodoResult: UserModel[] = []
  subscription: Subscription = new Subscription()

  constructor(
    private todoService: TodoService,
    private router: Router,
    private errorHandle: ErrorHandlingService) { }

  ngOnInit(): void {
    const subscribe = this.todoService.getTodos().subscribe((userList: ListOfUsers) => {
      console.log(userList);
      this.listOfUsers = userList
    }, (err)=>  console.log(err))

    this.subscription.add(subscribe);
  }

  editTodo(id: string) {
    const subscribe = this.todoService.getTodos().subscribe((data) => {
      this.editTodoResult = data.results.filter((list) => list.id === id);
      this.todoService.todoChanged.next(this.editTodoResult);
    });

    this.subscription.add(subscribe);
  }

  deleteTodo(id: string) {
    const subscribe = this.todoService.deleteTodo(id)
      .subscribe(() => {
        let idIndex = this.listOfUsers.results.findIndex((list) => list.id === id);
        this.listOfUsers.results.splice(idIndex, 1);
      }, (err) => this.errorHandle.handleError(err));

    this.subscription.add(subscribe);
  }

  detailTodo(id: string) {
    this.router.navigate([`/todo/${id}`])
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
