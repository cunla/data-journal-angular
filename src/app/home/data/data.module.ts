import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxMapboxGLModule} from 'ngx-mapbox-gl';
import {environment} from '../../../environments/environment';
import {MapComponent} from './map/map.component';
import {RouterModule, Routes} from '@angular/router';
import {HomeGuard} from '../guard/home.guard';
import {HomeGuardModule} from '../guard/home.guard.module';
import {ToolsModule} from "../common/tools.module";


const routes: Routes = [
  {path: '', redirectTo: 'map', pathMatch: 'full'},
  {path: 'map', component: MapComponent, canActivate: [HomeGuard]},
];


@NgModule({
  declarations: [
    MapComponent,
  ],
  imports: [
    CommonModule,
    NgxMapboxGLModule.withConfig({
      accessToken: environment.mapboxToken, // Optionnal, can also be set per map (accessToken input of mgl-map)
      // geocoderAccessToken: 'TOKEN'
      // Optionnal, specify if different from the map access token, can also be set per mgl-geocoder (accessToken input of mgl-geocoder)
    }),
    HomeGuardModule,
    RouterModule.forChild(routes),
    ToolsModule,
  ]
})
export class DataModule {
}
