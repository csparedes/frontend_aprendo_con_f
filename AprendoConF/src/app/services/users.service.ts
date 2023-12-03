import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../interfaces/user.interface';
import {USERS} from "../database/user.db";
import { lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private arrayUsers: User[] = USERS;
  private baseUrl:string ="https://dummyjson.com/auth/login"
  private httpClient = inject(HttpClient);
  //private id: number = 5;

login(user: User): Promise<any> {
  return lastValueFrom(this.httpClient.post(this.baseUrl, user));
}

getUserById(id: number) : User{
    return this.arrayUsers.find((user) => user.id === id)!;
  }


}
