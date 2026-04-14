import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/authentication-service';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  @Output() menuClick = new EventEmitter<void>();

  private authService = inject(AuthenticationService);
  private userService = inject(UserService);
  private router = inject(Router);

  get userData() {
    return this.authService.getUserData();
  }

  goToUserProfile() {
    const userData = this.authService.getUserData();
    console.log('Dati utente recuperati:', userData);

    if (userData && userData.id) {
      this.router.navigate(['/UserProfile', userData.id]);
    } else {
      this.router.navigate(['/login']);
    }
  }

  goToWishlist() {
    this.router.navigate(['/wishlist']);
  }
  goToCart() {
    this.router.navigate(['/cart']);
  }

  goToAdmin() {
    this.router.navigate(['/admin']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.userService.logout().subscribe({
      next: (res: any) => {
        this.authService.resetAll();
        this.router.navigate(['']);
        console.log(this.authService.getUserData());
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
