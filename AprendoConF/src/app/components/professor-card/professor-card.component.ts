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

  private userService = inject(DataService);
  private authService = inject(AuthService);

  ngOnInit() {
    this.getUsers();
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
}
