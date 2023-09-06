import { Component, OnInit } from '@angular/core';
import { ListOfUsers } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  listOfUsers!: ListOfUsers;
  errorMessage = ''
  listItems = [
    {
      id: "6825e2d2-181d-4f4e-85c1-f7c8744db808",
      title: "Check email on daily basis",
      completed: true,
      created_at: "2023-08-19T16:19:00.247337+05:00",
      updated_at: "2023-08-29T20:36:11.196543+05:00",
      user: 1
    },
    {
      id: "6825e2d2-181d-4f4e-85c1-f7c8744db808",
      title: "Check email on daily basis",
      completed: true,
      created_at: "2023-08-19T16:19:00.247337+05:00",
      updated_at: "2023-08-29T20:36:11.196543+05:00",
      user: 1
    },
    {
      id: "6825e2d2-181d-4f4e-85c1-f7c8744db808",
      title: "Check email on daily basis",
      completed: true,
      created_at: "2023-08-19T16:19:00.247337+05:00",
      updated_at: "2023-08-29T20:36:11.196543+05:00",
      user: 1
    },
  ]

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getListOfUsers().subscribe((userList: ListOfUsers) => {
      this.listOfUsers = userList
    },
      (err) => {
        this.errorMessage = err.errorMessage
      }
    )
  }

}
