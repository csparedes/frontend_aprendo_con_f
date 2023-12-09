import { Component, EventEmitter, ViewChild } from '@angular/core';
import { LoginModalComponent } from '../modal/login-modal/login-modal.component';
declare var bootstrap: any;
@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css']
})
export class AppBarComponent {
  @ViewChild(LoginModalComponent) loginModalComponent!: LoginModalComponent;
  loginModal: any;


  openLoginModal() {   
   this.loginModalComponent.openModalhijo(); 
  }
}
