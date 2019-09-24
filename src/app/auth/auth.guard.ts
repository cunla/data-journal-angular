import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public auth: AuthService,
              private router: Router) {
  }

  canActivate(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.auth.isLoggedIn) {
        this.router.navigate(['/home']).then();
        resolve(false);
      } else {
        resolve(true);
      }
    });
  }
}
