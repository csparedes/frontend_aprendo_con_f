// import { Component } from '@angular/core';
// import {User} from "../../interfaces/user.interface";
// import {ActivatedRoute} from "@angular/router";
// import {UserService} from "../../services/users.service";
//
// @Component({
//   selector: 'app-student-profile',
//   templateUrl: './student-profile.component.html',
//   styleUrls: ['./student-profile.component.css']
// })
// export class StudentProfileComponent {
//   oneStudentId!: string;
//
//   oneStudent: User = {
//     id: 0,
//     status: '',
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
//       this.oneStudentId = params.id;
//       //this.oneStudent = this.userService.getUserById(Number(this.oneStudentId));
//     });
//   }
//
// }
