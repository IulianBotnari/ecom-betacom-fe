import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private platformId = inject(PLATFORM_ID);
  user = 'USER';
  admin = 'ADMIN';

  setLogin(id: string, role: string) {
    localStorage.setItem('userId', id);
    localStorage.setItem('role', role);
  }

  isAdmin(): boolean {
    const value = localStorage.getItem('role');

    if (value != null && this.admin === value) {
      return true;
    }

    return false;
  }

  isUser(): boolean {
    const value = localStorage.getItem('role');

    if (value != null && this.user === value) {
      return true;
    }

    return false;
  }

  resetAll() {
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
  }

  getUserData(): any {
    if (isPlatformBrowser(this.platformId)) {
      const userId = localStorage.getItem('userId');
      const role = localStorage.getItem('role');

      if (userId) {
        return {
          id: userId,
          role: role,
        };
      }
    }

    return null;
  }
}
