import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AutorizacionService {

  private usuarioactual = new BehaviorSubject<any>(null);
   usuarioActual = this.usuarioactual.asObservable();
   infoUser: any;

   get currentUserValue() {
    return this.usuarioactual.value;
  }
  login(datos:any) {
    localStorage.setItem('miToken', datos);
    function decodeJWT(token: any) {
    token = localStorage.getItem('miToken');  
        const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
    }
    this.infoUser = decodeJWT(datos); 
    const user={id:this.infoUser.id, rol: this.infoUser.role};
    console.log('usuario',user);
    return this.usuarioactual.next(user);
  }

  logout() {
    localStorage.removeItem('miToken');
    this.usuarioactual.next(null);
  }

  getRolUsuario(): string | null {
    const token = localStorage.getItem('miToken');
    if (!token) return null; 

    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );

      const decodedToken = JSON.parse(jsonPayload);
      return decodedToken && decodedToken.role ? decodedToken.role : null;
    } catch (error) {
      console.error('Error al decodificar el token', error);
      return null; 
    }
  }


  constructor() {
    const token = localStorage.getItem('miToken');
    if (token) {
      this.login(token); 
    }
  } 
   
}
