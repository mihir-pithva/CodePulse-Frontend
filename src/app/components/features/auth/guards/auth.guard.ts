import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';

// export const authGuard: CanActivateFn = (route, state) => {
//   const cookieService: CookieService = new CookieService(document, PLATFORM_ID);
//   const authService: AuthService = new AuthService();
//   const router = Inject(Router);
//   const user = authService.getUser();

//   let token = cookieService.get('Authorization');

//   if (token) {
//     token = token.replace('Bearer ', '');

//     const decodedToken: any = jwtDecode(token);
//     const expirationDate = decodedToken.exp * 1000;
//     const currentTime = new Date().getTime();

//     if (expirationDate < currentTime) {
//       authService.logout();
//       return router.createUrlTree(['/login'], {
//         queryParams: {
//           returnUrl: state.url,
//         },
//       });
//     } else {
//       if (user.roles.includes('Writer')) {
//         return true;
//       } else {
//         alert('Unauthorized!!!');
//         return false;
//       }
//     }
//   } else {
//     authService.logout();
//     return router.createUrlTree(['/login'], {
//       queryParams: {
//         returnUrl: state.url,
//       },
//     });
//   }
// };

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const token = this.cookieService.get('Authorization');

    if (token) {
      const decodedToken: any = jwtDecode(token.replace('Bearer ', ''));
      const expirationDate = decodedToken.exp * 1000;
      const currentTime = new Date().getTime();

      if (expirationDate < currentTime) {
        this.authService.logout();
        return this.router.createUrlTree(['/login'], {
          queryParams: {
            returnUrl: state.url,
          },
        });
      } else {
        const user = this.authService.getUser();
        if (user && user.roles && user.roles.includes('Writer')) {
          return true;
        } else {
          alert('Unauthorized ! Please login as admin to access this route !!');
          return false;
          // if (confirm('Please login as admin to access this route !! ')) {
          //   this.router.navigateByUrl('/login');
          // } else {
          //   this.router.navigateByUrl('/');
          // }
          // return false;
        }
      }
    } else {
      this.authService.logout();
      return this.router.createUrlTree(['/login'], {
        queryParams: {
          returnUrl: state.url,
        },
      });
    }
  }
}
