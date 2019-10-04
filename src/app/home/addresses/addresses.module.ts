import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddressListComponent} from './list/address-list.component';
import {AddressComponent} from './address/address.component';
import {EditAddressComponent} from './edit-address/edit-address.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSliderModule} from '@angular/material/slider';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {HomeGuardModule} from '../guard/home.guard.module';
import {HomeGuard} from '../guard/home.guard';
import {AddressService} from './address.service';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {DatesModule} from '../common/dates.module';
import {MatIconModule} from '@angular/material/icon';

const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  {path: 'list', component: AddressListComponent, canActivate: [HomeGuard]},
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
    FontAwesomeModule,
    MatButtonModule,
    MatInputModule,
    MatSliderModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatAutocompleteModule,
    HomeGuardModule,
    DatesModule,
    MatIconModule,
  ],
  providers: [
    MatDatepickerModule,
    AddressService,
  ],
})
export class AddressesModule {
  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    library.addIconPacks(fas, far, fab);
  }
}
