import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from "../../interfaces/user.interface";
import {DataService} from "../../services/data.service";
import { Observable } from 'rxjs';


@Component({
  selector: 'app-professor-profile',
  templateUrl: './professor-profile.component.html',
  styleUrls: ['./professor-profile.component.css']
})
export class ProfessorProfileComponent implements OnInit {
  oneProfessorId!: string;
  //oneProfessor: Observable<User | undefined>;
  oneProfessor: User | any

    userService : DataService = inject(DataService);
    activatedRoute = inject(ActivatedRoute);

  router = inject(Router);


  //   ngOnInit() {
  //   this.activatedRoute.params.subscribe((params: any) => {
  //     this.oneProfessorId = params.id;
  //     console.log('Id:',this.oneProfessorId);
  //     const oneProfessorBody =  params.body;
  //     console.log('Body:',oneProfessorBody);
  //     this.oneProfessor =  this.userService.getUserById(Number(this.oneProfessorId));
  //     console.log(this.oneProfessor);
  //   });
  // }

  async ngOnInit() {
  this.activatedRoute.params.subscribe(async (params: any) => {
    this.oneProfessorId = params.id;
    this.oneProfessor = await this.userService.getUserById(Number(this.oneProfessorId));
    this.oneProfessor = this.oneProfessor[0];
    //this.oneProfessor.areas = this.oneProfessor.areas.split(',')
    console.log(this.oneProfessor);
  });
}

  getRatingImageUrl(rating: number): string {
    return `./assets/images/Puntuacion_Gold_${rating}_Stars.png`;
  }
}
