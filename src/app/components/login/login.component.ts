import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  login_form: {
    username: string;
    password: string;
    remenber_me: boolean;
  } = {
    username: '',
    password: '',
    remenber_me: false,
  };

  constructor() {}

  loginSubmit() {}
}
