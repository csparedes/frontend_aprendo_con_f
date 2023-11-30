import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserRegistrationFormComponent } from '../components/user-registration-form/user-registration-form.component';
import { ProfessorProfileComponent } from './professor-profile/professor-profile.component';
import { C404Component } from './c404/c404.component';
import { ForoqaComponent } from './foroqa/foroqa.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'newuser', component: UserRegistrationFormComponent },
  { path: 'teacher/:id', component: ProfessorProfileComponent },
  { path: 'foro/:id', component: ForoqaComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
