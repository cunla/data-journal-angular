import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddressListComponent} from './list/address-list.component';
import {AddressComponent} from './address/address.component';
import {EditAddressComponent} from './edit-address/edit-address.component';
import {RouterModule, Routes} from "@angular/router";

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
  ]
})
export class AddressesModule {
}
