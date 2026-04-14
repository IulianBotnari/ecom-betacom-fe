import { inject, PLATFORM_ID} from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication-service';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
 const authService = inject(AuthenticationService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

if (!isPlatformBrowser(platformId)) {
    return true; 
  }

  const expectedRole = route.data['expectedRole'];
  const loggedUserId = localStorage.getItem('userId');
  const urlId = route.params['id'];

  if (expectedRole === 'ADMIN') {
    if (authService.isAdmin()) return true;
  }

  if (urlId) {

    if (loggedUserId === urlId) {
      return true;
    }
  }

  router.navigate(['/login']);
  return false;
};
