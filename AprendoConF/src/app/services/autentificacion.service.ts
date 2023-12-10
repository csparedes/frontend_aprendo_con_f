import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AutentificacionService {

  private usuarioactual = new BehaviorSubject<any>(null);
  usuarioActual = this.usuarioactual.asObservable();

  constructor() { }


  get currentUserValue() {
    return this.usuarioactual.value;
    
  }

  login(datos:any, id: number, rol: string) {
    localStorage.setItem('miToken', datos);
    const user={id:id, rol: rol};
    return this.usuarioactual.next(user);
  }

  logout() {
    localStorage.removeItem('miToken');
    this.usuarioactual.next(null);
  }

}
