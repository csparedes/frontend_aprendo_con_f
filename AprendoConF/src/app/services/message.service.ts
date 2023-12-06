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

  public errorSerivicios() {
    Swal.fire({
      iconHtml: '<img src="../../assets/bad.png" style="width:80%">',
      html: `<p style="font-size: 1rem;  color: #1d5172";>Algo Salió mal intentelo mas tarde</p>`,
      title: `<p style="font-size: 1.5rem; margin:0px !important;  color: #1d5172";>Error en el servicio</p>`,
      customClass: {
        icon: 'no-border',
        popup: 'custom-popup',
      },
      showConfirmButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Continuar',
    });
  }

  public mensajeError(mensaje: string, titulo: string) {
    Swal.fire({
      iconHtml: '<img src="../../assets/bad.png" style="width:80%">',
      html: `<p style="font-size: 1rem;  color: #1d5172";>${mensaje}</p>`,
      title: `<p style="font-size: 1.5rem; margin:0px !important;  color: #1d5172";>${titulo}</p>`,
      customClass: {
        icon: 'no-border',
        popup: 'custom-popup',
      },
      showConfirmButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Continuar',
    });
  }
}
