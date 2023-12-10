import { CanActivateFn } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router)
  
  if (localStorage.getItem('miToken')) {
    return true;

  }else{

    window.alert("Debes iniciar sesión para acceder a esta página");
    router.navigate(['pages', 'home']);
    return false;
  }
};
