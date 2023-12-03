import { Component } from '@angular/core';
//import {USERS} from "../../database/user.db";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  //protected readonly USERS = USERS;
  protected readonly USERS: any = [];

}
