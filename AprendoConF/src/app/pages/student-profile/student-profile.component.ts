import {Component, inject} from '@angular/core';
import {User} from "../../interfaces/user.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent {
  oneStudentId!: string;
  oneStudent: User | any;

  userService : DataService = inject(DataService);
  activatedRoute= inject(ActivatedRoute);

  router = inject(Router);


  async ngOnInit() {
  this.activatedRoute.params.subscribe(async (params: any) => {
    this.oneStudentId = params.id;
    this.oneStudent = await this.userService.getStudentById(Number(this.oneStudentId));
    this.oneStudent = this.oneStudent[0];
    this.oneStudent.areas = this.oneStudent.areas.split(',')
    console.log(this.oneStudent);
  });
}

}
