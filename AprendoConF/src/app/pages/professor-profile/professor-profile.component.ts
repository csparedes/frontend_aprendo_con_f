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
  showOpinionModal: boolean = false;

  userService: DataService = inject(DataService);
  messageService = inject(MessageService);
  activatedRoute = inject(ActivatedRoute);

  router = inject(Router);
  async ngOnInit() {
    this.getTeachersById();
  }

  getTeachersById() {
    this.messageService.loading(true);
    this.activatedRoute.params.subscribe(async (params: any) => {
      this.oneProfessorId = params.id;
      this.oneProfessor = await this.userService.getProfessorById(
        Number(this.oneProfessorId)
      );
      this.oneProfessor = this.oneProfessor[0];
      this.oneProfessor.areas = this.oneProfessor.areas.split(',');
      this.messageService.loading(false);
      console.log(this.oneProfessor);
    });
  }

  getRatingImageUrl(rating: number): string {
    return `./assets/images/Puntuacion_Gold_${rating}_Stars.png`;
  }

  openTestimonials() {
    console.log('Image clicked');
    this.showOpinionModal = true;
  }
}
