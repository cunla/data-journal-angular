import {Routes} from '@angular/router';

export const rootRouterConfig: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
  {path: 'home', loadChildren: './home/home.module#HomeModule'},
  {path: 'privacy-policy', loadChildren: './privacy-policy/privacy-policy.module#PrivacyPolicyModule'},
];
