import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/authentication-service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  @Output() menuClick = new EventEmitter<void>();

  private authService = inject(AuthenticationService)
  private router = inject(Router)


  
  goToUserProfile(){
    const userData = this.authService.getUserData()
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


}
