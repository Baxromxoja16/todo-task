import { Component } from '@angular/core';
import { ListOfUsers } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent {
  todoForm!: FormGroup;
  errorMessage = ''

  constructor(private formBuilder: FormBuilder, private todoService: TodoService) { }

  ngOnInit() {
    this.todoForm = this.formBuilder.group({
      title: [null, Validators.required],
      completed: [null, Validators.required],
      user: [null, Validators.required]
    });
  }

  onSubmit() {
    if (this.todoForm.invalid) {
      return;
    }

    const todoData = this.todoForm.value;

    this.todoService.postTodo(todoData).subscribe(() => {},
      (err) => {
        this.errorMessage = err.errorMessage
      }
    )
  }
}
