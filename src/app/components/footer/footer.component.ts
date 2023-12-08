import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  object: any = {};
  message: string = "Gracias por subscribirse a nuestra newsletter";
  displayMessage: boolean = false;

  getDataTemplate(form: any) {
    this.object = form.value;
    form.resetForm();

    // Display Message when user submits
    this.displayMessage = true;

    // Hide Message after 3 seconds
    setTimeout(() => {
      this.displayMessage = false;
    }, 3000);
  }
}


