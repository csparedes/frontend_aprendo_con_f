import { Component, EventEmitter, Output, ViewChild, inject } from '@angular/core';
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

  private modalInstance: any; 
  @Output() closeLoginModalEvent = new EventEmitter<void>();
 

  userServices = inject(UserService)
  oculatarPassword:boolean=true
  ImagenOjo= 'assets/images/eye-l.svg'

  constructor() {
   }
  
  ngAfterViewInit() { 
   //  this.modalInstance = new bootstrap.Modal(this.modalElement.nativeElement);
    this.loginForm.reset();
  }

    cerrarModal() {
     this.closeLoginModalEvent.emit(); 
  }


  ToggleEstadoPassword(): void{
    this.oculatarPassword = !this.oculatarPassword
    this.ImagenOjo = this.oculatarPassword? 'assets/images/eye-l.svg': 'assets/images/eye.svg'
  }

  async getDataForm(loginForm:any):Promise<void>{
  try{
    const response = await this.userServices.login(loginForm.value)
    if(response.token) localStorage.setItem('miToken', response.token)
    this.closeLoginModalEvent.emit(); 
  }
  catch(msg:any){
    alert(msg.error.message);
    loginForm.reset();
   }  
}
}





