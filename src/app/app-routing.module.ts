import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TodoFormComponent } from './todo/components/todo-form/todo-form.component';
import { TodoListComponent } from './todo/components/todo-list/todo-list.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'todo', pathMatch: 'full',
  },
  { path: 'login', loadChildren: ()=> import('./login/login.module').then(m => m.LoginModule)},
  { path: 'todo',  loadChildren: ()=> import('./todo/todo.module').then(m => m.TodoModule)},
  {
    path: '**', redirectTo: 'login', pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
