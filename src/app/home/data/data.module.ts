import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MapComponent} from './map/map.component';
import {RouterModule, Routes} from '@angular/router';
import {HomeGuard} from '../guard/home.guard';
import {HomeGuardModule} from '../guard/home.guard.module';
import {ToolsModule} from '../common/tools.module';
import {AgmCoreModule} from '@agm/core';
import {environment} from '../../../environments/environment';
import {GoogleChartsModule} from 'angular-google-charts';
import {ChartComponent} from './chart/chart.component';
import {MapboxComponent} from './mapbox/mapbox.component';
import {NgxMapboxGLModule} from 'ngx-mapbox-gl';


const routes: Routes = [
  {path: '', redirectTo: 'map', pathMatch: 'full'},
  // {path: 'map', component: ChartComponent, canActivate: [HomeGuard]},
  {path: 'map', component: MapboxComponent, canActivate: [HomeGuard]},
];


@NgModule({
  declarations: [
    MapComponent,
    ChartComponent,
    MapboxComponent,
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: environment.firebase.apiKey,
    }),
    NgxMapboxGLModule.withConfig({
      accessToken: environment.mapboxToken, // Optionnal, can also be set per map (accessToken input of mgl-map)
      // geocoderAccessToken: 'TOKEN'
      // Optionnal, specify if different from the map access token, can also be set per mgl-geocoder (accessToken input of mgl-geocoder)
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
