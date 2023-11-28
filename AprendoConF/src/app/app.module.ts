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
import { HomeComponent } from './pages/home/home.component';
import { C404Component } from './pages/c404/c404.component';
import { UserRegistrationFormComponent } from './components/user-registration-form/user-registration-form.component';
import { ProfessorCardComponent } from './components/professor-card/professor-card.component';
import { ProfessorProfileComponent } from './pages/professor-profile/professor-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    AppBarComponent,
    HeaderComponent,
    UserRegistrationFormComponent,
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
