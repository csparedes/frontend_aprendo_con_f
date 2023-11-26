import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import {USERS} from "../database/user.db";


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private arrayUsers: User[] = USERS;
  //private id: number = 5;

  getUserById(id: number) : User{
    return this.arrayUsers.find((user) => user.id === id)!;
  }
}
