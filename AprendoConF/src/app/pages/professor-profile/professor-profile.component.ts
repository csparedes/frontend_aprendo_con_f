import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-professor-profile',
  templateUrl: './professor-profile.component.html',
  styleUrls: ['./professor-profile.component.css'],
})
export class ProfessorProfileComponent implements OnInit {
  oneProfessorId!: string;
  oneProfessor: User | any;
  userId: any;
  infoUser: any;
  roleUser!: string;

  showOpinionModal: boolean = false;
  token = localStorage.getItem('miToken'); //agregado
  show = false;

  userService: DataService = inject(DataService);
  messageService = inject(MessageService);
  activatedRoute = inject(ActivatedRoute);

  router = inject(Router);
  async ngOnInit() {
    if (this.userService.isLogged()) {
      console.log(localStorage.getItem('miToken'));
      let token = localStorage.getItem('miToken');
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
      this.roleUser = this.infoUser.role;
    }
    this.getTeachersById();

    this.mostrar();
  }

  mostrar() {
    console.log(this.token);
    this.token ? (this.show = true) : (this.show = false);
  }

  getTeachersById() {
    this.messageService.loading(true);
    this.activatedRoute.params.subscribe(async (params: any) => {
      this.oneProfessorId = params.id;
      this.oneProfessor = await this.userService.getProfessorById(
        Number(this.oneProfessorId)
      );
      console.log(this.oneProfessor);
      this.oneProfessor = this.oneProfessor[0];
      this.oneProfessor.areas = this.oneProfessor.areas.split(',');
      this.messageService.loading(false);
      console.log(this.oneProfessor);
    });
  }

  getRatingImageUrl(rating: number): any {
    return `./assets/images/Puntuacion_Gold_${rating}_Stars.png`;
  }

  openTestimonials() {
    console.log('Image clicked');
    this.showOpinionModal = true;
  }
}
