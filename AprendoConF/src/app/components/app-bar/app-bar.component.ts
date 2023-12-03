import { Component } from '@angular/core';
declare var bootstrap: any;
@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css']
})
export class AppBarComponent {
  loginModal: any;

  openLoginModal() {   

    if(!this.loginModal) {
        this.loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
    }
    this.loginModal.show();

  }
  closeLoginModal() {
   if(this.loginModal) this.loginModal.hide();
  }

}
