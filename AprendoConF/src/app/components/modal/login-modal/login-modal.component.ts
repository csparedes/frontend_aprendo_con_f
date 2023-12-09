import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/users.service';

declare var bootstrap: any;

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {

  @ViewChild('loginForm') loginForm!: NgForm
  @ViewChild('loginModal') modalElement!: ElementRef;
  private modalInstance: any; 
   
 

  userServices = inject(UserService)
  oculatarPassword:boolean=true
  ImagenOjo= 'assets/images/eye-l.svg'

  constructor() {
   }
  
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

  ToggleEstadoPassword(): void{
    this.oculatarPassword = !this.oculatarPassword
    this.ImagenOjo = this.oculatarPassword? 'assets/images/eye-l.svg': 'assets/images/eye.svg'
  }

  async getDataForm(loginForm:any):Promise<void>{
    if(loginForm.valid) {
      try{
        const response = await this.userServices.login(loginForm.value)
        console.log(response);
        if(response.token) localStorage.setItem('miToken', response.token)
        this.cerrarModal(); 
      }
      catch(msg:any){
        alert(msg.error.message);
        loginForm.reset();
       } 
    }
    else
    {
      alert('Por favor, ingrese sus datos para iniciar sesión.');
    }
  }
}

