import {Component, inject} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.css']
})
export class UserRegistrationFormComponent {
  userRegistrationForm:FormGroup;


  //router = inject('Router')

  constructor() {
    this.userRegistrationForm = new FormGroup({
      username: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required,
        //At least 1: Upper Case, Lower Case, Digit, Special Character & Minimum 8 Character Length
        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,6}$/)
      ]),
      name: new FormControl('', [
        Validators.required
      ]),
      postalcode: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]{5}$/)
      ]),
      country: new FormControl('', [
        Validators.required
      ]),
      role: new FormControl('', [
        Validators.required
      ])

    }, []);
  }

  getDataForm(){
    console.log(this.userRegistrationForm.value);
    this.userRegistrationForm.value.country = this.userRegistrationForm.value.country.name
    this.userRegistrationForm.reset();
  }

   formValidator(formControlName:string, validator:string): boolean | undefined{
    return this.userRegistrationForm.get(formControlName)?.hasError(validator) && this.userRegistrationForm.get(formControlName)?.touched
  }

}
