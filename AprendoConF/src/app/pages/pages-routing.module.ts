import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserRegistrationFormComponent } from '../components/user-registration-form/user-registration-form.component';
import { ViewsComponent } from './views/views.component';
//import { ProfessorProfileComponent } from './professor-profile/professor-profile.component';
//import {StudentProfileComponent} from "./student-profile/student-profile.component";
import { C404Component } from './c404/c404.component';
import { MapaComponent } from '../components/mapa/mapa.component';
import { ProfessorProfileComponent } from './professor-profile/professor-profile.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'newuser', component: UserRegistrationFormComponent },
  { path: 'professor/:id', component: ProfessorProfileComponent },
  { path: 'student/:id', component: StudentProfileComponent },
  { path: 'views', component: ViewsComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
