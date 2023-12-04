import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserRegistrationFormComponent } from './components/user-registration-form/user-registration-form.component';
import { C404Component } from './pages/c404/c404.component';
import { ProfessorProfileComponent } from './pages/professor-profile/professor-profile.component';
import { MapaComponent } from './components/mapa/mapa.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pages',
    pathMatch: 'full',
  },
  {
    path: 'pages',
    loadChildren: () =>
      import('./pages/pages.module').then((module) => module.PagesModule),
  },
  {
    path: 'mapa',
    component: MapaComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
