import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TodoComponent } from './todo.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoDetailsComponent } from './components/todo-details/todo-details.component';



@NgModule({
  declarations: [
    TodoFormComponent,
    TodoListComponent,
    TodoComponent,
    TodoDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: TodoComponent }, { path: ':id', component: TodoDetailsComponent }])
  ],
  exports: [
    TodoFormComponent,
    TodoListComponent,
    TodoComponent
  ]
})
export class TodoModule { }
