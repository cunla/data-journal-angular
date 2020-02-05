import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeGuard} from '../guard/home.guard';
import {HomeGuardModule} from '../guard/home.guard.module';
import {ToolsModule} from '../common/tools.module';
import {ChartComponent} from './chart/chart.component';
import {HighchartsChartModule} from 'highcharts-angular';

const routes: Routes = [
  {path: '', redirectTo: 'map', pathMatch: 'full'},
  {path: 'map', component: ChartComponent, canActivate: [HomeGuard]},
];


@NgModule({
  declarations: [
    ChartComponent,
  ],
  imports: [
    HighchartsChartModule,
    CommonModule,
    HomeGuardModule,
    RouterModule.forChild(routes),
    ToolsModule,
  ],
  providers: [
  ],
})
export class DataModule {
}
