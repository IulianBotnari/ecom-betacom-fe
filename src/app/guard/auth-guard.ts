import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication-service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  const expectedRole = route.data['expectedRole'];

  const loggedUserId = localStorage.getItem('userId');
  const urlId = route.params['id'];

  if (expectedRole === 'admin' && authService.isAdmin() && loggedUserId === urlId) {
    return true;
  }

  if (expectedRole === 'user' && authService.isUser() && loggedUserId === urlId) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
