import { Component } from '@angular/core';
import { LoginUser } from './models/loginUser.model';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: LoginUser;

  constructor(
    private _authService: AuthService,
    private _cookieService: CookieService,
    private _router: Router
  ) {
    this.user = {
      email: '',
      password: '',
    };
  }

  onFormSubmit() {
    this._authService.login(this.user).subscribe({
      next: (response) => {
        //set auth cookie
        this._cookieService.set(
          'Authorization',
          `Bearer ${response.token}`,
          undefined,
          '/',
          undefined,
          true,
          'Strict'
        );
        this._authService.setUser({
          email: response.email,
          roles: response.roles,
        });
        this._router.navigateByUrl('/');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
