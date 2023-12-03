import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import {USERS} from "../database/user.db";
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrlLogin: string = 'https://dummyjson.com/auth/login';
  private baseUrlUsers: string = 'http://localhost:3001/api/users';
  private httpClient = inject(HttpClient);
  //private id: number = 5;

  login(user: User): Promise<any> {
    return lastValueFrom(this.httpClient.post(this.baseUrlLogin, user));
  }

  // private arrayUsers: User[] = USERS;
  // //private id: number = 5;
  //
  // getUserById(id: number) : User{
  //   return this.arrayUsers.find((user) => user.id === id)!;
  // }

  getAll() {
    const data = firstValueFrom(this.httpClient.get<User[]>(this.baseUrlUsers));
    //return firstValueFrom(this.httpClient.get<User[]>(this.baseUrl));
    console.log(data);
    return data;
  }
}
