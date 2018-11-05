import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LoginComponent } from './login-form/login.component';
import { FacebookLoginComponent } from './facebook-login-form/facebook-login.component';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent, LoginComponent, FacebookLoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
