import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { User, sendStatus } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseUrl = 'http://localhost:3001/api/users/';
  private httpClient = inject(HttpClient);

  getAllUsers() {
    return firstValueFrom(this.httpClient.get<User[]>(this.baseUrl));
  }

  updateState(id: number, status: sendStatus) {
    return firstValueFrom(
      this.httpClient.put<any[]>(`${this.baseUrl}/estado/${id}`, status)
    );
  }
}
