import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { User, sendStatus } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseUrl = 'http://localhost:3001/api/users';

  private baseUrlprofessor: string =
    'http://localhost:3001/api/users/profesores/activo';
  private baseUrlstudent: string =
    'http://localhost:3001/api/users/estudiante/activo';
  private baseUbicaciones: string = 
  'http://localhost:3001/api/users/datos/profesor';

  private baseUrlenrollment : string = 'http://localhost:3001/api/enrollments';

  private httpClient = inject(HttpClient);

  async insertUser(formValue: any): Promise<User> {
    try {
      return await firstValueFrom(this.httpClient.post<User>(this.baseUrl, formValue));
    } catch (error) {
      console.error('Error inserting user:', error);
      throw error;
    }
}

  getAllUsers() {
    return firstValueFrom(this.httpClient.get<User[]>(this.baseUrl));
  }

  updateState(id: number, status: sendStatus) {
    return firstValueFrom(
      this.httpClient.put<any[]>(`${this.baseUrl}/estado/${id}`, status)
    );
  }
  getAllActiveProfessors() {
    return firstValueFrom(this.httpClient.get<User[]>(this.baseUrlprofessor));
  }

  getProfessorById(id: number): Promise<User> {
    return firstValueFrom(
      this.httpClient.get<User>(`${this.baseUrlprofessor}/${id}`)
    );
  }

  getAllActiveStudents() {
    return firstValueFrom(this.httpClient.get<User[]>(this.baseUrlstudent));
  }

  getLocations() {
    return firstValueFrom(this.httpClient.get<User[]>(this.baseUbicaciones));
  }

  getStudentById(id: number): Promise<User> {
    return firstValueFrom(
      this.httpClient.get<User>(`${this.baseUrlstudent}/${id}`)
    );
  }

  createNewEnrollment(data: { student_id: number, teacher_id: number }) {
    return this.httpClient.post(`${this.baseUrlenrollment}`, data);
   }
}
