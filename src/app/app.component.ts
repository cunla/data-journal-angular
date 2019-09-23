import {Component, ViewEncapsulation} from '@angular/core';
import {UserService} from './auth/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  private user: any;

  constructor(private userService: UserService) {
    this.userService.getUserFromFirebase().subscribe((user) => {
      this.user = user;
    });
  }
}
