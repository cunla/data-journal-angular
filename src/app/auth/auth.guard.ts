import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    public afAuth: AngularFireAuth,
    // public userService: UserService,
    private router: Router
  ) {
  }

  canActivate(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.afAuth.user.subscribe(user => {
        if (user) {
          this.router.navigate(['/user']).then();
          resolve(false);
        } else {
          resolve(true);
        }
      });
      // this.userService.getCurrentUser()
      //   .then(user => {
      //     this.router.navigate(['/user']).then();
      //     return resolve(false);
      //   }, err => {
      //     return resolve(true);
      //   });
    });
  }
}
