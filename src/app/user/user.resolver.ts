import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from "@angular/router";
import {UserService} from '../auth/user.service';
import {UserModel} from '../auth/user.model';

@Injectable()
export class UserResolver implements Resolve<UserModel> {

  constructor(public userService: UserService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot): Promise<UserModel> {
    const user = new UserModel();
    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
        .then(res => {
          if (res.providerData[0].providerId === 'password') {
            user.image = 'https://via.placeholder.com/400x300';
            user.name = res.displayName;
            user.provider = res.providerData[0].providerId;
            return resolve(user);
          } else {
            user.image = res.photoURL;
            user.name = res.displayName;
            user.provider = res.providerData[0].providerId;
            return resolve(user);
          }
        }, err => {
          this.router.navigate(['/auth/login']).then();
          return reject(err);
        });
    });
  }
}
