import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DataService } from '../../services/data.service';
import { MessageService } from '../../services/message.service';
import { User } from '../../interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.css'],
})
export class UserRegistrationFormComponent {
  userRegistrationForm: FormGroup;
  showPassword: boolean = false;
  user!: User;
  userknoweldge!: any;
  teacher_id: any;
  arrAreas: any[] = [];

  usersService = inject(DataService);

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  message = inject(MessageService);
  authService = inject(AuthService);

  errorUserMessage(mensaje: string) {
    Swal.fire(mensaje);
  }

  //
  constructor() {
    this.userRegistrationForm = new FormGroup(
      {
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [
          Validators.required,
          //At least 1: Upper Case, Lower Case, Digit, Special Character & Minimum 8 Character Length
          Validators.pattern(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
          ),
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,6}$/),
        ]),
        name: new FormControl('', [Validators.required]),
        postal_code: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[0-9]{5}$/),
        ]),
        country: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
        role: new FormControl('', [Validators.required]),
        knowledgeArea: new FormControl('', []),
        hourly_rate: new FormControl('', []),
        imageUrl: new FormControl('', [
          Validators.pattern(
            /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/
          ),
        ]),
        description: new FormControl('', []),
        experience: new FormControl('', []),
        phone: new FormControl('', []),
        status: new FormControl('activo'),
      },
      []
    );
  }

  async getDataForm(): Promise<void> {
    if (this.userRegistrationForm.get('role')?.value == 'profesor') {
      this.user = {
        role: this.userRegistrationForm.get('role')?.value,
        username: this.userRegistrationForm.get('username')?.value,
        password: this.userRegistrationForm.get('password')?.value,
        email: this.userRegistrationForm.get('email')?.value,
        name: this.userRegistrationForm.get('name')?.value,
        postal_code: this.userRegistrationForm.get('postal_code')?.value,
        country: this.userRegistrationForm.get('country')?.value.name,
        city: this.userRegistrationForm.get('city')?.value,
        areas: this.userRegistrationForm.get('knowledgeArea')?.value,
        experience: this.userRegistrationForm.get('experience')?.value,
        imageUrl: this.userRegistrationForm.get('imageUrl')?.value,
        description: this.userRegistrationForm.get('description')?.value,
        hourly_rate: this.userRegistrationForm.get('hourly_rate')?.value,
        rating: 0,
        phone: this.userRegistrationForm.get('phone')?.value,
        status: 'registrado',
      };
    } else if (this.userRegistrationForm.get('role')?.value == 'estudiante') {
      this.user = {
        role: this.userRegistrationForm.get('role')?.value,
        username: this.userRegistrationForm.get('username')?.value,
        password: this.userRegistrationForm.get('password')?.value,
        email: this.userRegistrationForm.get('email')?.value,
        name: this.userRegistrationForm.get('name')?.value,
        postal_code: this.userRegistrationForm.get('postal_code')?.value,
        country: this.userRegistrationForm.get('country')?.value.name,
        city: this.userRegistrationForm.get('city')?.value,
        areas: this.userRegistrationForm.get('knowledgeArea')?.value,
        experience: this.userRegistrationForm.get('experience')?.setValue(0),
        imageUrl: this.userRegistrationForm.get('imageUrl')?.value,
        description: this.userRegistrationForm.get('description')?.value,
        hourly_rate: this.userRegistrationForm.get('hourly_rate')?.setValue(0),
        rating: this.userRegistrationForm.get('rating')?.setValue(0),
        phone: this.userRegistrationForm.get('phone')?.value,
        status: 'activo',
      };
    }

    try {
      this.message.loading(true);
      this.userRegistrationForm.value.country =
        this.userRegistrationForm.value.country.name;
      let response = await this.authService.registerUser(this.user);

      this.message.loading(false);
      if (response.respuesta) {
        //Knowledge Area
        if (this.user.role === 'profesor') {
          // @ts-ignore
          this.teacher_id = response.resultado[0].id;
          // Iterar sobre las áreas nuevas y crear una promesa para cada inserción
          this.arrAreas = this.user.areas.split(', ');
          for (const el of this.arrAreas) {
            this.insertKnoweldge(el);
          }
        }
        //Termina Knowledge Area
        Swal.fire({
          title: 'Creación Exitosa.',
          text: `El usuario ${this.user.username} ahora se encuentra registrado`,
          icon: 'info',
          confirmButtonColor: '#5fc1c5   ',
          confirmButtonText: 'Aceptar',
        }).then((result) => {
          if (result.isConfirmed) {
            this.userRegistrationForm.reset();
            this.router.navigate(['/pages', 'home']);
          }
        });
      } else {
        this.message.mensajeError(
          response.mensaje,
          'Falla en la Creación de usuario'
        );
      }
    } catch (error) {
      this.message.errorSerivicios();
    }
  }

  formValidator(
    formControlName: string,
    validator: string
  ): boolean | undefined {
    return (
      this.userRegistrationForm.get(formControlName)?.hasError(validator) &&
      this.userRegistrationForm.get(formControlName)?.touched
    );
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async insertKnoweldge(area: any) {
    this.message.loading(true);
    try {
      if (this.userRegistrationForm.get('role')?.value == 'profesor') {
        this.userknoweldge = {
          teacher_id: this.teacher_id,
          category: 'stop',
          description: 'stop',
          level: 'stop',
          area: area,
          active: true,
        };
        const data = await this.usersService.insertKnowledgeArea(
          this.userknoweldge
        );
        this.message.loading(false);
      }
    } catch (error) {}
  }
}
