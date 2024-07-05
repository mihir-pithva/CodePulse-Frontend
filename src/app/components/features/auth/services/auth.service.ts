import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUser } from '../login/models/loginUser.model';
import { environment } from 'src/environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../login/models/loginResponse.model';
import { User } from '../login/models/User.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  $user = new BehaviorSubject<User | undefined>(undefined);

  constructor(
    private _http: HttpClient,
    private _cookieService: CookieService
  ) {}

  login(user: LoginUser): Observable<LoginResponse> {
    return this._http.post<LoginResponse>(
      `${environment.apiBaseUrl}/api/auth/login`,
      {
        email: user.email,
        password: user.password,
      }
    );
  }

  setUser(user: User) {
    this.$user.next(user);
    localStorage.setItem('user-email', user.email);
    localStorage.setItem('user-roles', user.roles.join(','));
  }

  user(): Observable<User | undefined> {
    return this.$user.asObservable();
  }

  getUser(): User | undefined {
    const email = localStorage.getItem('user-email');
    const roles = localStorage.getItem('user-roles');
    if (email && roles) {
      const user: User = {
        email: email,
        roles: roles?.split(','),
      };
      return user;
    }
    return undefined;
  }

  logout(): void {
    localStorage.clear();
    this._cookieService.delete('Authorization', '/');
    this.$user.next(undefined);
  }
}
