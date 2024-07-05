import { Component, OnInit } from '@angular/core';
import { AuthService } from '../features/auth/services/auth.service';
import { User } from '../features/auth/login/models/User.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user?: User;
  constructor(private _authService: AuthService, private _router: Router) {}
  ngOnInit(): void {
    this._authService.user().subscribe({
      next: (response) => {
        this.user = response;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.user = this._authService.getUser();
  }
  onLogout() {
    this._authService.logout();
    this._router.navigateByUrl('/');
  }
}
