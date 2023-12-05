import {Component, inject, Input} from '@angular/core';
import {User} from "../../interfaces/user.interface";
import {DataService} from "../../services/data.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-professor-card',
  templateUrl: './professor-card.component.html',
  styleUrls: ['./professor-card.component.css']

})
export class ProfessorCardComponent {
  @Input() professorCard : User[] = [];
  router = inject(Router);

  private userService  = inject(DataService);

  async ngOnInit(){
    try{
      const response: User[] = await this.userService.getAllActiveProfessors();
      console.log(response);
      this.professorCard = response;
      this.professorCard.forEach(card => {
        card.areas = String(card.areas).split(',')
      })
    }catch(error:any){
      console.log(error);
    }
  }
  getRatingImageUrl(rating: number): string {
  return `./assets/images/Puntuacion_Gold_${rating}_Stars.png`;
}

}
