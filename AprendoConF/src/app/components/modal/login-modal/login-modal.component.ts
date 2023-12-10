import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AutorizacionService } from 'src/app/services/autorizacion.service';
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
  @ViewChild('loginModal') modalElement!: ElementRef;
  private modalInstance: any;

  userServices = inject(UserService);
  router = inject(Router);
  messageService = inject(MessageService);
  oculatarPassword: boolean = true;
  ImagenOjo = 'assets/images/eye-l.svg';
  mensajeError = '';
  errorView: boolean = false;

  private autorizacionService = inject(AutorizacionService)
  constructor() {}

  openModalhijo() {
    if (!this.modalInstance) {
      this.modalInstance = new bootstrap.Modal(this.modalElement.nativeElement);
    }
    this.modalInstance.show();
    this.loginForm.reset();
  }
  cerrarModal() {
    this.modalInstance.hide();
  }

  ToggleEstadoPassword(): void {
    this.oculatarPassword = !this.oculatarPassword;
    this.ImagenOjo = this.oculatarPassword
      ? 'assets/images/eye-l.svg'
      : 'assets/images/eye.svg';
  }

  async getDataForm(loginForm: any): Promise<void> {
    this.messageService.loading(true);
    if (loginForm.valid) {
      try {
        const response = await this.userServices.login(loginForm.value);
        console.log(response);
          const { respuesta, mensaje, resultado } = response;
        this.messageService.loading(false);
        if (respuesta) {
          //localStorage.setItem('miToken', resultado);
          this.autorizacionService.login(resultado);
          this.cerrarModal();
          loginForm.reset();
          this.router.navigate(['pages', 'home']);
          window.location.reload();
        } else {
          this.errorView = !respuesta;
          this.mensajeError = mensaje;
        }
      } catch (msg: any) {
        alert(msg.error.message);
        loginForm.reset();
      }
    } else {
      alert('Por favor, ingrese sus datos para iniciar sesión.');
    }
  }
  
}
