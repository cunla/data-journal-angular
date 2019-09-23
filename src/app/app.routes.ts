import {Routes} from '@angular/router';
import {UserComponent} from './user/user.component';
import {UserResolver} from './user/user.resolver';

export const rootRouterConfig: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
  {path: 'user', component: UserComponent, resolve: {data: UserResolver}}
];
