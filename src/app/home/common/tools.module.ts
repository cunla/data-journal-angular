import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material";
import {MomentDateAdapter} from "@angular/material-moment-adapter";
import {DATE_FORMATS} from "./dates";
import {CountriesService} from "./countries.service";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers:[
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS},
    CountriesService,
  ]
})
export class ToolsModule { }
