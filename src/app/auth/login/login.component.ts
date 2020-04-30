import {Component} from '@angular/core';
import {AuthService} from '../auth.service'
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'page-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage = '';

  constructor(public authService: AuthService,
              private router: Router,
              private fb: FormBuilder,) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  tryFacebookLogin() {
    this.authService.doFacebookLogin().then(res => {
    });
  }

  tryTwitterLogin() {
    this.authService.doTwitterLogin().then(res => {
    });
  }

  tryGoogleLogin() {
    this.authService.doGoogleLogin().then(res => {
    });
  }

  tryLogin(value) {
    this.authService.doLogin(value).then(res => {
      },
      err => {
        console.log(err);
        this.errorMessage = err.message;
      });
  }
}
