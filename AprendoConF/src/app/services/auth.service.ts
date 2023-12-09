import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { User, loginBody } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);

  private baseUrl = 'http://localhost:3001/api/users/';
  private baseUrlLogin = 'http://localhost:3001/user/login/';

  async registerUser(formValue: any): Promise<User> {
    try {
      return await firstValueFrom(
        this.httpClient.post<User>(`${this.baseUrl}register`, formValue)
      );
    } catch (error) {
      console.error('Error inserting user:', error);
      throw error;
    }
  }

  login(login: loginBody): Promise<any> {
    return firstValueFrom(this.httpClient.post(this.baseUrlLogin, login));
  }
}
