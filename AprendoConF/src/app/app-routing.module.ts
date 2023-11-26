import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {UserRegistrationFormComponent} from "./components/user-registration-form/user-registration-form.component";
import {C404Component} from "./pages/c404/c404.component";
import {ProfessorProfileComponent} from "./pages/professor-profile/professor-profile.component";

const routes: Routes = [
  {path: "", pathMatch: 'full', redirectTo: 'home'},
  {path: "home", component:HomeComponent},
  {path: "newuser", component:UserRegistrationFormComponent},
  {path: "professor/:id", component: ProfessorProfileComponent},
  {path: "**", component: C404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
