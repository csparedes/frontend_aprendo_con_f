import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { USERS } from '../database/user.db';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  arrayAlumnos: User[] = USERS
  constructor() { }
  
  getAll(): User[]{
    return this.arrayAlumnos
  }
  
  getById(id:number):User | undefined{
    return this.arrayAlumnos.find(user=>user.id===id)
  }
  
  getAllProfe(role:string):User[]{
    return this.arrayAlumnos.filter(user=>user.role===role)
  }
}
