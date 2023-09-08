import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandlingService } from 'src/app/core/services/error-handling.service';
import { UserModel } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css']
})
export class TodoDetailsComponent implements OnInit, OnDestroy {
  item!: UserModel;
  subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private todoService: TodoService,
    private errorHandle: ErrorHandlingService) { }

  ngOnInit(): void {
    let id = this.router.routerState.snapshot.url.split('/')[2];

    const subscribe = this.todoService.getDetailTodo(id).subscribe((todo) => {
      this.item = todo;
    }, (err) => this.errorHandle.handleError(err))

    this.subscription.add(subscribe);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
