import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

  constructor(public afAuth: AngularFireAuth) {
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
    return this.afAuth.auth.signOut();
  }

  private loginWithProvider(provider) {
    return this.afAuth.auth.signInWithPopup(provider);
  }

}
