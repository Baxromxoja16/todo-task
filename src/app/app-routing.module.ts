import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './login/guards/login.guard';

const routes: Routes = [
  {
    path: '', redirectTo: 'todo', pathMatch: 'full',
  },
  { path: 'login', loadChildren: ()=> import('./login/login.module').then(m => m.LoginModule), title: 'Login' },
  { path: 'todo', canActivate: [LoginGuard],  loadChildren: ()=> import('./todo/todo.module').then(m => m.TodoModule), title: 'Todo' },
  {
    path: '**', redirectTo: 'todo', pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
