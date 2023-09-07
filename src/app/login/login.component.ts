import { Component, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ResponseToken } from './model/user.model';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  loginForm!: FormGroup;
  emailRegex = new RegExp(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)
  errorMessage = '';
  subscription: Subscription = new Subscription()

  constructor(private formBuilder: FormBuilder, private loginService: LoginService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      "email": ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      "password": ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    // Perform login/authentication logic here
    this.subscription.add(this.loginService.login(this.loginForm.value).subscribe(
      (res: ResponseToken) => {
        localStorage.setItem('token', res.token)
      },
      (err) => {
        this.errorMessage = err.errorMessage
      }
    ))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
