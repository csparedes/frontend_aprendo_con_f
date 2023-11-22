import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppBarComponent } from './components/app-bar/app-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { C404Component } from './pages/c404/c404.component';
import { UserRegistrationFormComponent } from './components/user-registration-form/user-registration-form.component';
import { ProfessorCardComponent } from './components/professor-card/professor-card.component';

@NgModule({
  declarations: [
    AppComponent,
    AppBarComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    C404Component,
    UserRegistrationFormComponent,
    ProfessorCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
