import { Component, OnInit } from '@angular/core';
import { ListOfUsers, UserModel } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  listOfUsers!: ListOfUsers;
  errorMessage = ''
  editTodoResult: UserModel[] = []

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.listItems.subscribe((userList: ListOfUsers) => {
      this.listOfUsers = userList
    },
      (err) => {
        this.errorMessage = err.errorMessage
      }
    )
  }

  editTodo(id: string) {
    this.todoService.listItems.subscribe((data) => {
      this.editTodoResult = data.results.filter((list) => list.id === id);
      this.todoService.todoChanged.next(this.editTodoResult);
    })
  }

  deleteTodo(id: string) {

  }

}
