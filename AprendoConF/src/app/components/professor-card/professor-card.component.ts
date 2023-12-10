import { Component, inject, Input } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-professor-card',
  templateUrl: './professor-card.component.html',
  styleUrls: ['./professor-card.component.css'],
})
export class ProfessorCardComponent {




  
  @Input() professorCard: User[] = [];
  router = inject(Router);
  mensajeService = inject(MessageService);
  oneStudent: User | any;

  private userService = inject(DataService);
  private authService = inject(AuthService);

  async ngOnInit() {
    this.getUsers();
    this.oneStudent = await this.userService.getAllUsers();
  }

  async getUsers() {
    this.mensajeService.loading(true);
    try {
      const test = localStorage.getItem('miToken');
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

  suscribete(proffesor_id: any) {

    if ('miToken' in localStorage == true){
      console.log(localStorage.getItem('miToken'))
      console.log(proffesor_id)
      console.log(this.oneStudent)


      var token = localStorage.getItem('miToken');

      function decodeJWT(token: any) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    }

     var infoUser = decodeJWT(token);

     var emailUser = infoUser.user_data.email;

     var idUser ;

     let j;

     for (j = 0; j < this.oneStudent.length; j++){
      if (this.oneStudent[j].email == emailUser){
        idUser = this.oneStudent[j].id
      }
      

     };

     
    this.userService.createNewEnrollment({
        student_id: idUser,
        teacher_id: proffesor_id
      }).subscribe(response => {
        console.log('Actualización exitosa', response);
        window.alert('Suscripción exitosa');

       
   
      }, error => {
        console.error('Error al actualizar la calificación y revisión', error);
      
      })

    }  
      else{
        const registro = '/pages/newuser'
        this.router.navigate([registro]);
      }

  }

  getRatingImageUrl(rating: number): string {
    return `./assets/images/Puntuacion_Gold_${rating}_Stars.png`;
  }
}
