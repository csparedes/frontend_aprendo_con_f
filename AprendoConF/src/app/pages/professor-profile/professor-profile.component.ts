// import {Component, OnInit} from '@angular/core';
// import {ActivatedRoute} from '@angular/router';
// import {User} from "../../interfaces/user.interface";
// import {UserService} from "../../services/users.service";
//
//
// @Component({
//   selector: 'app-professor-profile',
//   templateUrl: './professor-profile.component.html',
//   styleUrls: ['./professor-profile.component.css']
// })
// export class ProfessorProfileComponent implements OnInit {
//   oneProfessorId!: string;
//
//   oneProfessor: User = {
//     id: 0,
//     registered: false,
//     imageUrl: '',
//     name: '',
//     username: '',
//     password: '',
//     email: '',
//     postalcode: '',
//     country: '',
//     role: '',
//     knowledgeAreas: [],
//     location: {
//       name: '',
//       country: '',
//       pinImage: '',
//     },
//     price: '',
//     rating: 0,
//     description: ''
//   };
//
//   constructor(private activatedRoute: ActivatedRoute, private userService: UserService) { }
//
//   ngOnInit() {
//     this.activatedRoute.params.subscribe((params: any) => {
//       this.oneProfessorId = params.id;
//       this.oneProfessor = this.userService.getUserById(Number(this.oneProfessorId));
//     });
//   }
//
//   getRatingImageUrl(rating: number): string {
//     return `./assets/images/Puntuacion_Gold_${rating}_Stars.png`;
//   }
//
// }
