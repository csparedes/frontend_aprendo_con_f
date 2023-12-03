import { Injectable, inject } from '@angular/core';
import {HttpClient} from "@angular/common/http";
//import {USERS} from "../database/user.db";
import {firstValueFrom} from "rxjs";
import { User } from '../interfaces/user.interface';



@Injectable({
  providedIn: 'root',
})
export class UserService {
  // private arrayUsers: User[] = USERS;
  // //private id: number = 5;
  //
  // getUserById(id: number) : User{
  //   return this.arrayUsers.find((user) => user.id === id)!;
  // }

  private baseUrl: string = 'http://localhost:3001/api/users';
  private httpClient = inject(HttpClient);

  getAll() {
    const data = firstValueFrom(this.httpClient.get<User[]>(this.baseUrl));
    //return firstValueFrom(this.httpClient.get<User[]>(this.baseUrl));
    console.log(data);
    return data;
  }

}
