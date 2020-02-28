import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TripsListComponent} from './list/trips-list.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TripsService} from './trips.service';
import {EditTripComponent} from './edit-trip/edit-trip.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {TripComponent} from './trip/trip.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {HomeGuard} from '../guard/home.guard';
import {HomeGuardModule} from '../guard/home.guard.module';
import {ToolsModule} from '../common/tools.module';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSliderModule} from '@angular/material/slider';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';

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
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    CommonModule,
    RouterModule.forChild(routes),
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
    MatIconModule,
    MatListModule,
    ToolsModule,
  ],
  providers: [
    MatDatepickerModule,
    TripsService,
  ],
})
export class TripsModule {
}
