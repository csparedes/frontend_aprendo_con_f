// import { Injectable } from '@angular/core';
// import { User } from '../interfaces/user.interface';
// import { USERS } from '../database/user.db';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProfesoresService {

//   arrayProfesores: User[] = USERS

//   constructor() { }

//   getAll(): User[]{
//     return this.arrayProfesores
//   }

//   getById(id:number):User | undefined{
//     return this.arrayProfesores.find(user=>user.id===id)
//   }

//   getAllProfe(role:string):User[]{
//     return this.arrayProfesores.filter(user=>user.role===role)
//   }

// }
