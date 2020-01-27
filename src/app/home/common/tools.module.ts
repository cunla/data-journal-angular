import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatIconModule, MatIconRegistry} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DATE_FORMATS} from './dates';
import {DomSanitizer} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {CitiesService} from './cities.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
    HttpClientModule,
  ],
  providers: [
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS},
    CitiesService,
  ]
})
export class ToolsModule {
  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {
    const countriesIso2s = CitiesService.getCountriesIso2();
    for (let ind in countriesIso2s) {

      this.matIconRegistry.addSvgIcon(
        'flag-' + countriesIso2s[ind],
        this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/flags/${countriesIso2s[ind]}.svg`)
        // this.domSanitizer.bypassSecurityTrustResourceUrl(COUNTRIES[ind].flag)
      );
    }
  }
}
