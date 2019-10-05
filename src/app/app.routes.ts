import {Routes} from '@angular/router';
import {PrivacyPolicyComponent} from './privacy-policy/privacy-policy.component';

export const rootRouterConfig: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
  {path: 'home', loadChildren: './home/home.module#HomeModule'},
  {path: 'privacy-policy', component: PrivacyPolicyComponent},
];
