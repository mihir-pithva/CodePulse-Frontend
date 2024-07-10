import { Component } from '@angular/core';
import { LoginUser } from './models/loginUser.model';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private toast: ToastrService,
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
        console.log(this._authService.getUser());
        this._router.navigateByUrl('/');
        this.toast.success('Login successful!', 'Success');
      },
      error: () => {
        this.toast.error(
          'Please provide valid email and password !!',
          'Unable to login'
        );
      },
    });
  }
}
