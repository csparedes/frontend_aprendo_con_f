import { Component, inject, Input } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-professor-card',
  templateUrl: './professor-card.component.html',
  styleUrls: ['./professor-card.component.css'],
})
export class ProfessorCardComponent {
  @Input() professorCard: User[] = [];
  router = inject(Router);
  mensajeService = inject(MessageService);
  oneStudent: any;
  userId: any;
  infoUser: any;
  idUser: any;
  arrTeachers: any[] = [];

  public userService = inject(DataService);
  private authService = inject(AuthService);

  async ngOnInit() {
    if (this.userService.isLogged()) {
      console.log(localStorage.getItem('miToken'));
      var token = localStorage.getItem('miToken');
      function decodeJWT(token: any) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          window
            .atob(base64)
            .split('')
            .map(function (c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
        );
        return JSON.parse(jsonPayload);
      }

      this.infoUser = decodeJWT(token);
      console.log(this.infoUser);
      this.userId = this.infoUser.id;
      this.idUser;
    }
    this.teacherByStudent();
    this.getUsers();
    this.oneStudent = await this.userService.getAllUsers();
  }

  suscribete(proffesor_id: any) {
    if (this.userService.isLogged()) {
      this.mensajeService.loading(true);
      this.userService
        .createNewEnrollment({
          student_id: this.userId,
          teacher_id: proffesor_id,
        })
        .subscribe(
          (response) => {
            console.log('Actualización exitosa', response);
            this.mensajeService.loading(false);
            Swal.fire({
              title: 'Creación Exitosa.',
              text: `Ahora se encuentra subscrito al profesor`,
              icon: 'info',
              confirmButtonColor: '#5fc1c5   ',
              confirmButtonText: 'Aceptar',
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          },
          (error) => {
            console.error(
              'Error al actualizar la calificación y revisión',
              error
            );
          }
        );
    } else {
      const registro = '/pages/newuser';
      this.router.navigate([registro]);
    }
  }

  async getUsers() {
    this.mensajeService.loading(true);

    try {
      const response: User[] = await this.userService.getAllActiveProfessors();
      console.log(response);
      this.professorCard = response;
      this.professorCard.forEach((card) => {
        card.areas = String(card.areas).split(',');
        this.mensajeService.loading(false);
      });
    } catch (error: any) {
      this.mensajeService.errorSerivicios();
    }
  }
  getRatingImageUrl(rating: number): string {
    return `./assets/images/Puntuacion_Gold_${rating}_Stars.png`;
  }

  async teacherByStudent() {
    this.mensajeService.loading(true);
    try {
      const data = await this.userService.getprofesoresDeEstudiante(
        this.userId
      );
      for (const el of data) {
        console.log(el);
        this.arrTeachers.push(el.id);
      }
      this.mensajeService.loading(false);
      console.log(this.arrTeachers);
    } catch (error) {}
  }
}
