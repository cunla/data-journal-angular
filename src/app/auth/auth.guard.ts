import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable} from "rxjs";


@Injectable()
export class AuthGuard implements CanActivate {
  loggedinSubject: Observable<boolean>;
  private loggedIn: boolean = false;

  constructor(public auth: AuthService) {
    this.loggedinSubject = auth.loggedinSubject();
    this.loggedinSubject.subscribe((val) => {
      this.loggedIn = val;
    })
  }

  canActivate(): Promise<boolean> {
    return Promise.resolve(!this.loggedIn);
  }
}
