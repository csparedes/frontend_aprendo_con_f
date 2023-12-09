import { CanActivateChildFn } from '@angular/router';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  console.log('ENTRAAAAA al GUARD');

  if (localStorage.getItem('token')) {
    //TODO: comprobar si el token es valido
    return true;
  }

  return false;
};
