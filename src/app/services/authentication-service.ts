import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  user = 'user';
  admin = 'admin';

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
    localStorage.removeItem('userId')
    localStorage.removeItem('role')
  }
}
