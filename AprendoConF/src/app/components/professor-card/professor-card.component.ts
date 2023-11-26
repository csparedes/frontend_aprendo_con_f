import {Component, Input} from '@angular/core';
import {User} from "../../interfaces/user.interface";
import {USERS} from "../../database/user.db";

@Component({
  selector: 'app-professor-card',
  templateUrl: './professor-card.component.html',
  styleUrls: ['./professor-card.component.css']
})
export class ProfessorCardComponent {
  @Input() professorCard: User[] = USERS;

  getRatingImageUrl(rating: number): string {
  return `./assets/images/Puntuacion_Gold_${rating}_Stars.png`;
}

}
