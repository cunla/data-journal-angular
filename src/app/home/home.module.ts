import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TripsModule} from './trips/trips.module';

const routes: Routes = [
  {path: '', redirectTo: 'trips', pathMatch: 'full'},
  {path: 'trips', loadChildren: './trips/trips.module#TripsModule'},
];

@NgModule({
  declarations: [],
  imports: [
    TripsModule,
    RouterModule.forChild(routes),
  ]
})
export class HomeModule {
}
