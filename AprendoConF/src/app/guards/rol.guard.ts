import { CanActivateFn } from '@angular/router';

export const rolGuard: CanActivateFn = (route, state) => {
  return true;
};
