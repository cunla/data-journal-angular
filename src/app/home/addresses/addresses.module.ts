import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddressListComponent} from './list/address-list.component';
import {AddressComponent} from './address/address.component';
import {EditAddressComponent} from './edit-address/edit-address.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSliderModule} from '@angular/material/slider';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {AddressService} from './address.service';
import {ToolsModule} from '../common/tools.module';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';

const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  {path: 'list', component: AddressListComponent,},
];

@NgModule({
  declarations: [
    AddressListComponent,
    AddressComponent,
    EditAddressComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    RouterModule.forChild(routes),
    CommonModule,
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
    ToolsModule,
    MatIconModule,
    MatListModule,
  ],
  providers: [
    MatDatepickerModule,
    AddressService,
  ],
})
export class AddressesModule {
}
