import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/users.service';

declare var bootstrap: any;

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
})
export class LoginModalComponent {
  @ViewChild('loginForm') loginForm!: NgForm;

  private modalInstance: any;
  @Output() closeLoginModalEvent = new EventEmitter<void>();

  userServices = inject(UserService);
  authService = inject(AuthService);
  messageService = inject(MessageService);
  router = inject(Router);
  oculatarPassword: boolean = true;
  ImagenOjo = 'assets/images/eye-l.svg';
  mensajeError = '';

  constructor() {}

  ngAfterViewInit() {
    //  this.modalInstance = new bootstrap.Modal(this.modalElement.nativeElement);
    this.loginForm.reset();
  }

  cerrarModal() {
    this.closeLoginModalEvent.emit();
  }

  ToggleEstadoPassword(): void {
    this.oculatarPassword = !this.oculatarPassword;
    this.ImagenOjo = this.oculatarPassword
      ? 'assets/images/eye-l.svg'
      : 'assets/images/eye.svg';
  }

  async getDataForm(loginForm: any): Promise<void> {
    console.log(loginForm.value);

    try {
      const response = await this.authService.login(loginForm.value);
      console.log(response);
      if (response.respuesta) {
        localStorage.setItem('token', response.resultado);
        loginForm.reset();
        this.cerrarModal();
        this.router.navigate(['/pages']);
      } else {
        this.mensajeError = response.mensaje;
      }
    } catch (msg: any) {
      alert(msg.error.message);
      loginForm.reset();
    }
  }
}
