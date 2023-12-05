import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseUrl = 'http://localhost:3001/api/users';
  private baseUrlprofessor: string = 'http://localhost:3001/api/users/profesor';

  private httpClient = inject(HttpClient);

  getAllUsers() {
    return firstValueFrom(this.httpClient.get<User[]>(this.baseUrl));
  }

  getAllActiveProfessors(){
    return firstValueFrom(this.httpClient.get<User[]>(this.baseUrlprofessor));
  }

    getUserById(id: number) : Promise<User>{
    return firstValueFrom(this.httpClient.get<User>(`${this.baseUrlprofessor}/${id}`));
  }

}
