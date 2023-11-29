import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { C404Component } from './c404/c404.component';
import { HomeComponent } from './home/home.component';
import { ProfessorProfileComponent } from './professor-profile/professor-profile.component';
import { FooterComponent } from '../components/footer/footer.component';
import { ProfessorCardComponent } from '../components/professor-card/professor-card.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StudentProfileComponent } from './student-profile/student-profile.component';

@NgModule({
  declarations: [
    C404Component,
    HomeComponent,
    ProfessorProfileComponent,
    FooterComponent,
    ProfessorCardComponent,
    StudentProfileComponent,
  ],
  imports: [CommonModule, PagesRoutingModule, HttpClientModule, FormsModule],
  exports: [
    FooterComponent
  ]
})
export class PagesModule {}
