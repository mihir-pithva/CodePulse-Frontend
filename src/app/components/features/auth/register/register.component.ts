import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RegisterUser } from '../login/models/RegisterUser.model';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user: RegisterUser;
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private toast: ToastrService
  ) {
    this.user = {
      email: '',
      password: '',
    };
  }

  onFormSubmit() {
    this._authService.register(this.user).subscribe({
      next: (response) => {
        if (response.email) {
          this._router.navigateByUrl('/login');
          this.toast.success(
            'Registered successful! Please login to continue',
            'Success'
          );
        } else {
          this.toast.success('Unable to register');
        }
      },
      error: (error) => {
        this.toast.error(
          'Please provide valid email and password !!',
          'Unable to register'
        );
      },
    });
  }
}
