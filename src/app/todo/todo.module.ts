import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TodoComponent } from './todo.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';



@NgModule({
  declarations: [
    TodoFormComponent,
    TodoListComponent,
    TodoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: TodoComponent }])
  ],
  exports: [
    TodoFormComponent,
    TodoListComponent,
    TodoComponent
  ]
})
export class TodoModule { }
