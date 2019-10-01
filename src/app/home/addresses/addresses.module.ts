import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddressListComponent} from './list/address-list.component';
import {AddressComponent} from './address/address.component';
import {EditAddressComponent} from './edit-address/edit-address.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {AgmCoreModule} from '@agm/core';
import {environment} from '../../../environments/environment';

const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  {path: 'list', component: AddressListComponent},
];


@NgModule({
  declarations: [
    AddressListComponent,
    AddressComponent,
    EditAddressComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.placesApiKey,
      libraries: ['places'],
    })
  ]
})
export class AddressesModule {
}
