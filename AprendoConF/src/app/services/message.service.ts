import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor() {}

  public loading(activo: boolean) {
    if (activo) {
      Swal.fire({
        customClass: 'swal-wide',
        allowOutsideClick: false,
        showConfirmButton: false,
        title: `<p style="font-size: 1.5rem; margin:0px !important;  color: #1d5172";>Por favor espere</p>`,
        html: `<p style="font-size: 1rem;  color: #1d5172";>Procesando Información</p>
    <img src="../../assets/loading-97.gif" style="width:40%">`,
      });
    } else {
      Swal.close();
    }
  }
}
