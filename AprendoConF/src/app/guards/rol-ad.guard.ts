import { CanActivateFn } from '@angular/router';

export const rolAdGuard: CanActivateFn = (route, state) => {
  return true;
};
