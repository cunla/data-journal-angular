import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TripsModule} from './trips/trips.module';
import {AddressesModule} from './addresses/addresses.module';
import {DataModule} from './data/data.module';

const routes: Routes = [
  {path: '', redirectTo: 'trips', pathMatch: 'prefix'},
  {path: 'trips', loadChildren: './trips/trips.module#TripsModule'},
  {path: 'address-history', loadChildren: './addresses/addresses.module#AddressesModule'},
  {path: 'info', loadChildren: './data/data.module#DataModule'},
];

@NgModule({
  declarations: [],
  imports: [
    TripsModule,
    AddressesModule,
    DataModule,
    RouterModule.forChild(routes),
  ]
})
export class HomeModule {
}
