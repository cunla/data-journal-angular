import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {rootRouterConfig} from './app.routes';
import {UserComponent} from './user/user.component';
import {ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {AuthModule} from './auth/auth.module';
import {UserResolver} from './user/user.resolver';
import {AngularFontAwesomeModule} from 'angular-font-awesome';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
  ],
  imports: [
    AuthModule,
    RouterModule.forRoot(rootRouterConfig, {useHash: false}),
    BrowserModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
  ],
  providers: [
    UserResolver,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
