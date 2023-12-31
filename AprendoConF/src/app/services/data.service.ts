import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { User, sendStatus } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseUrl = 'http://localhost:3001/api/users/';
  private baseUrlenrollment: string = 'http://localhost:3001/api/enrollments';
  private baseUrlprofessor: string =
    'http://localhost:3001/api/users/profesores/activo';
  private baseUrlstudent: string =
    'http://localhost:3001/api/users/estudiante/activo';
  private baseUbicaciones: string =
    'http://localhost:3001/api/users/datos/profesor';
  private baseUrProfesByStudents: string =
    'http://localhost:3001/api/users/student/profesores/';

  private baseUrlKnowledgeAreas: string =
    'http://localhost:3001/api/knowledge/area/';

  private httpClient = inject(HttpClient);

  async insertUser(formValue: any): Promise<User> {
    try {
      return await firstValueFrom(
        this.httpClient.post<User>(this.baseUrl, formValue)
      );
    } catch (error) {
      console.error('Error inserting user:', error);
      throw error;
    }
  }

  getAllUsers() {
    return firstValueFrom(this.httpClient.get<User[]>(this.baseUrl));
  }

  getAllTeachers() {
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}prof/allProfesor`)
    );
  }

  getAllStudents() {
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}est/allEstudiante`)
    );
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

  getStudentById(id: number): Promise<User> {
    return firstValueFrom(
      this.httpClient.get<User>(`${this.baseUrlstudent}/${id}`)
    );
  }

  isLogged(): boolean {
    if (localStorage.getItem('miToken')) {
      return true;
    } else {
      return false;
    }
  }

  getStudentsByProfessorId(id: number) {
    return firstValueFrom(
      this.httpClient.get<User[]>(`${this.baseUrl}/profesor/estudiantes/${id}`)
    );
  }

  getProfesoresByStudentId(id: number) {
    return firstValueFrom(
      this.httpClient.get<User[]>(`${this.baseUrl}/student/profesores/${id}`)
    );
  }

  createNewEnrollment(data: { student_id: number; teacher_id: number }) {
    return this.httpClient.post(`${this.baseUrlenrollment}`, data);
  }

  getLocations() {
    return firstValueFrom(this.httpClient.get<User[]>(this.baseUbicaciones));
  }

  getprofesoresDeEstudiante(id: number) {
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrProfesByStudents}${id}`)
    );
  }
  updateReviewRating(
    enrollmentId: number,
    data: { rating: number; review: string }
  ) {
    return this.httpClient.put(
      `${this.baseUrlenrollment}/${enrollmentId}`,
      data
    );
  }

  insertKnowledgeArea(area: any) {
    return firstValueFrom(
      this.httpClient.post(this.baseUrlKnowledgeAreas, area)
    );
  }
}
