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
import { ChartComponent } from './chart/chart.component';


const routes: Routes = [
  {path: '', redirectTo: 'map', pathMatch: 'full'},
  {path: 'map', component: ChartComponent, canActivate: [HomeGuard]},
];


@NgModule({
  declarations: [
    MapComponent,
    ChartComponent,
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: environment.firebase.apiKey,
    }),
    GoogleChartsModule.forRoot(environment.firebase.apiKey),
    CommonModule,
    HomeGuardModule,
    RouterModule.forChild(routes),
    ToolsModule,
  ]
})
export class DataModule {
}
