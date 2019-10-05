import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TripsListComponent} from './list/trips-list.component';
import {RouterModule, Routes} from '@angular/router';
import {
  MatButtonModule,
  MatDialogModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatSliderModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TripsService} from './trips.service';
import {EditTripComponent} from './edit-trip/edit-trip.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {TripComponent} from './trip/trip.component';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {HomeGuard} from '../guard/home.guard';
import {HomeGuardModule} from '../guard/home.guard.module';
import {ToolsModule} from "../common/tools.module";
import {MatIconModule} from '@angular/material/icon';

const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  {path: 'list', component: TripsListComponent, canActivate: [HomeGuard]},
];

@NgModule({
  declarations: [
    TripsListComponent,
    EditTripComponent,
    TripComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
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
    ToolsModule,
    MatIconModule,
    MatListModule,
  ],
  providers: [
    MatDatepickerModule,
    TripsService,
  ],
})
export class TripsModule {
  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    library.addIconPacks(fas, far, fab);
  }
}
