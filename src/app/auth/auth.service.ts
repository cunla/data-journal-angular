import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable()
export class AuthService {
  user: firebase.User;
  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.isLoginSubject.next(true);
      } else {
        localStorage.setItem('user', null);
        this.isLoginSubject.next(false);
      }
    });
  }

  loggedinSubject(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  private hasToken(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null && user.uid != undefined;
  }

  doFacebookLogin() {
    return this.loginWithProvider(new firebase.auth.FacebookAuthProvider());
  }

  doTwitterLogin() {
    return this.loginWithProvider(new firebase.auth.TwitterAuthProvider());
  }

  doGoogleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    return this.loginWithProvider(provider);
  }

  doRegister(value) {
    return firebase.auth().createUserWithEmailAndPassword(value.email, value.password);
  }

  doLogin(value) {
    return firebase.auth().signInWithEmailAndPassword(value.email, value.password);
  }

  doLogout() {
    localStorage.setItem('user', null);
    return this.afAuth.signOut();
  }

  private loginWithProvider(provider) {
    return this.afAuth.signInWithPopup(provider);
  }


}
