import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppBarComponent } from './components/app-bar/app-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { UserRegistrationFormComponent } from './components/user-registration-form/user-registration-form.component';
import { LoginModalComponent } from './components/modal/login-modal/login-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    AppBarComponent,
    HeaderComponent,
    UserRegistrationFormComponent,
    LoginModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatSelectCountryModule.forRoot('es'),
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
