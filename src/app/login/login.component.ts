import { Component, ErrorHandler, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private errorHandle: ErrorHandler) { }

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
    const subscribe = this.loginService.login(this.loginForm.value).subscribe(
      (res: ResponseToken) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/todo']);
      },
      (err) => this.errorHandle.handleError(err)
    )

    this.subscription.add(subscribe)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
