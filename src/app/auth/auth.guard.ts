import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.userState().data) {
    return true;
  }

  router.navigate(['/login'], {
    queryParams: { returnUrl: state.url }, // Optional: Store the return URL
  });
  return false;
};
