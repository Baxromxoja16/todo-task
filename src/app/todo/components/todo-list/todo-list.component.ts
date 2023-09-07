import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.subscription.add(this.todoService.listItems.subscribe((userList: ListOfUsers) => {
      this.listOfUsers = userList
    },
      (err) => {
        this.errorMessage = err.errorMessage
      }
    ))
  }

  editTodo(id: string) {
    this.subscription.add(
      this.todoService.listItems.subscribe((data) => {
        this.editTodoResult = data.results.filter((list) => list.id === id);
        this.todoService.todoChanged.next(this.editTodoResult);
      })
    )
  }

  deleteTodo(id: string) {
    this.subscription.add(
      this.todoService.deleteTodo(id).subscribe(() => {
        let idIndex = this.listOfUsers.results.findIndex((list) => list.id === id);
        this.listOfUsers.results.splice(idIndex, 1);
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
