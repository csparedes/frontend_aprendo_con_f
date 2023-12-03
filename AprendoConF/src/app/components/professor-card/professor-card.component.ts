import {Component, inject, Input} from '@angular/core';
import {UserService} from "../../services/users.service";
import {User} from "../../interfaces/user.interface";
//import {USERS} from "../../database/user.db";

@Component({
  selector: 'app-professor-card',
  templateUrl: './professor-card.component.html',
  styleUrls: ['./professor-card.component.css']
})
export class ProfessorCardComponent {
  //@Input() professorCard: User[] = USERS;
  @Input() professorCard : User[] = [];

  private userService  = inject(UserService);

  async ngOnInit(){
    try{
      const response: User[] = await this.userService.getAll();
      console.log(response);
      this.professorCard = response;
    }catch(error:any){
      console.log(error);
    }
  }
  getRatingImageUrl(rating: number): string {
  return `./assets/images/Puntuacion_Gold_${rating}_Stars.png`;
}

}
