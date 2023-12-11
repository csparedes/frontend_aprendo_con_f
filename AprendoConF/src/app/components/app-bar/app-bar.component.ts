import { ChangeDetectorRef, Component, EventEmitter, ViewChild, inject } from '@angular/core';
import { LoginModalComponent } from '../modal/login-modal/login-modal.component';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { AutorizacionService } from 'src/app/services/autorizacion.service';
declare var bootstrap: any;
@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css'],
})
export class AppBarComponent {
  @ViewChild(LoginModalComponent) loginModalComponent!: LoginModalComponent;
  loginModal: any;
  usuarioActual: { rol: string; id: number; } = { rol: 'Invitado', id: 0 };
  router = inject(Router);
  public dataService = inject(DataService);
  private autorizacionServices = inject(AutorizacionService);

  constructor(private autorizacion: AutorizacionService, private cdr: ChangeDetectorRef) {
  }

ngOnInit(): void {
  this.autorizacion.usuarioActual.subscribe(usuario => {
    if (usuario == null) {
      this.usuarioActual = { rol: 'Invitado', id: 0 };
    } else {
      this.usuarioActual = usuario;
    }
    this.cdr.detectChanges();
  });
}

  openLoginModal() {
    this.loginModalComponent.openModalhijo();
  }

  cerrrarSesion() {
  this.autorizacion.logout();
    if (localStorage.getItem('miToken')) {
      localStorage.removeItem('miToken');
      this.router.navigate(['/pages']);
    }
    window.location.reload();
  }
}
