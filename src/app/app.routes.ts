import {Routes} from '@angular/router';
import {PrivacyPolicyComponent} from './privacy-policy/privacy-policy.component';

export const rootRouterConfig: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  {path: 'privacy-policy', component: PrivacyPolicyComponent},
];
