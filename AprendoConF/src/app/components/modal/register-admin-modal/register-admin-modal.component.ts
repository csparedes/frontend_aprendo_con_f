import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/users.service';

declare var bootstrap: any;

@Component({
  selector: 'app-register-admin-modal',
  templateUrl: './register-admin-modal.component.html',
  styleUrls: ['./register-admin-modal.component.css'],
})
export class RegisterAdminModalComponent {
  @ViewChild('registerAdminModal') registerAdminModal!: NgForm;

  private modalInstance: any;
  @Output() closeRegisterAdminModalEvent = new EventEmitter<void>();

  userServices = inject(UserService);
  oculatarPassword: boolean = true;
  ImagenOjo = 'assets/images/eye-l.svg';

  constructor() {}

  ngAfterViewInit() {
    //  this.modalInstance = new bootstrap.Modal(this.modalElement.nativeElement);
    this.registerAdminModal.reset();
  }

  cerrarModal() {
    this.closeRegisterAdminModalEvent.emit();
  }

  ToggleEstadoPassword(): void {
    this.oculatarPassword = !this.oculatarPassword;
    this.ImagenOjo = this.oculatarPassword
      ? 'assets/images/eye-l.svg'
      : 'assets/images/eye.svg';
  }

  async getDataForm(loginForm: any): Promise<void> {
    try {
      
    } catch (msg: any) {
      alert(msg.error.message);
      loginForm.reset();
    }
  }
}
