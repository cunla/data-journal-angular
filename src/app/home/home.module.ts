import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TripsModule} from './trips/trips.module';
import {AddressesModule} from "./addresses/addresses.module";

const routes: Routes = [
  {path: '', redirectTo: 'trips', pathMatch: 'full'},
  {path: 'trips', loadChildren: './trips/trips.module#TripsModule'},
  {path: 'address-history', loadChildren: './addresses/addresses.module#AddressesModule'},
];

@NgModule({
  declarations: [],
  imports: [
    TripsModule,
    AddressesModule,
    RouterModule.forChild(routes),
  ]
})
export class HomeModule {
}
