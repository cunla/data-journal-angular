import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MapComponent} from './map/map.component';
import {RouterModule, Routes} from '@angular/router';
import {HomeGuard} from '../guard/home.guard';
import {HomeGuardModule} from '../guard/home.guard.module';
import {ToolsModule} from "../common/tools.module";
import {BrowserModule} from "@angular/platform-browser";
import {AgmCoreModule} from "@agm/core";
import {environment} from "../../../environments/environment";
import {GoogleChartsModule} from 'angular-google-charts';


const routes: Routes = [
  {path: '', redirectTo: 'map', pathMatch: 'full'},
  {path: 'map', component: MapComponent, canActivate: [HomeGuard]},
];


@NgModule({
  declarations: [
    MapComponent,
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: environment.firebase.apiKey,
    }),
    // GoogleChartsModule.forRoot(),
    CommonModule,
    HomeGuardModule,
    RouterModule.forChild(routes),
    ToolsModule,
  ]
})
export class DataModule {
}
