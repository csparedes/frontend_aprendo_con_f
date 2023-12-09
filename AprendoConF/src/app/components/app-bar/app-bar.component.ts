import { Component, EventEmitter, ViewChild, inject } from '@angular/core';
import { LoginModalComponent } from '../modal/login-modal/login-modal.component';
import { Router } from '@angular/router';
declare var bootstrap: any;
@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css'],
})
export class AppBarComponent {
  @ViewChild(LoginModalComponent) loginModalComponent!: LoginModalComponent;
  loginModal: any;

  router = inject(Router);

  openLoginModal() {
    this.loginModalComponent.openModalhijo();
  }

  cerrrarSesion() {
    if (localStorage.getItem('miToken')) {
      localStorage.removeItem('miToken');
      this.router.navigate(['/pages']);
    }
  }
}
