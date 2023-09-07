import { Component, OnDestroy } from '@angular/core';
import { ListOfUsers, UserModel } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnDestroy {
  todoForm!: FormGroup;
  errorMessage = ''
  todoChanged: UserModel[] = []
  editMode = false;
  subscription: Subscription = new Subscription();

  constructor(private formBuilder: FormBuilder, private todoService: TodoService) { }

  ngOnInit() {
    this.subscription.add(this.todoService.todoChanged.subscribe((data) => {
      this.todoChanged = data
      this.editMode = true
      this.initForm()
    }))
    this.initForm()
  }

  onSubmit() {
    if (this.todoForm.invalid) {
      return;
    }

    const todoData = this.todoForm.value;

    if (this.editMode) {
      this.subscription.add(this.todoService.editTodo(this.todoChanged[0].id, todoData).subscribe(() => { },
        (err) => {
          this.errorMessage = err.errorMessage
        }
      ))
    } else {
      this.subscription.add(this.todoService.createTodo(todoData).subscribe(() => { },
         (err) => {
          this.errorMessage = err.errorMessage
       }
      ))
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  private initForm() {
    let title = '';
    let completed = false;
    let user: number | undefined;

    if (this.editMode) {
      title = this.todoChanged[0].title;
      completed = this.todoChanged[0].completed;
      user = this.todoChanged[0].user;
    }

    this.todoForm = this.formBuilder.group({
      title: [title, Validators.required],
      completed: [completed, Validators.required],
      user: [user, Validators.required]
    });
  }
}
