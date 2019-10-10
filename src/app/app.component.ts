import {Component} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public auth: AuthService,
              private router: Router,
  ) {

  }

  logout() {
    this.auth.doLogout().then(() => {
      this.router.navigate(['/auth/login']).then();
    });
  }
}
