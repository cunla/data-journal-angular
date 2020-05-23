import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ToolsModule} from '../common/tools.module';
import {HighchartsChartModule} from 'highcharts-angular';
import {MapchartArcsComponent} from './mapchart-arcs/mapchart-arcs.component';
import {TripsChartComponent} from './trips-chart/trips-chart.component';

const routes: Routes = [
  {path: '', redirectTo: 'map', pathMatch: 'full'},
  {path: 'map', component: TripsChartComponent},
];


@NgModule({
  declarations: [
    MapchartArcsComponent,
    TripsChartComponent,
  ],
  imports: [
    HighchartsChartModule,
    CommonModule,
    RouterModule.forChild(routes),
    ToolsModule,
  ],
  providers: [],
})
export class DataModule {
}
