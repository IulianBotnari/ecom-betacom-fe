import { Component, ViewChild } from '@angular/core';
import { UserService } from '../../services/user-service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: false
})
export class Login {

  @ViewChild('loginForm') loginForm!: NgForm;

  constructor(
    private userService: UserService,
    private routing: Router,
    private authService : AuthenticationService
  ) {}

 onSubmit() {
  const form = this.loginForm.value;

  this.userService.login({
    email: form.email,
    password: form.password
  }).subscribe({
    next: (r: any) => {
      console.log("Risposta server:", r);

      this.authService.setLogin(r.id, r.role);

      this.routing.navigate(['UserProfile', r.id]);
    },
    error: (err: any) => {
      console.error("Errore durante il login:", err);
    }
  });
}

  signUp() {
    this.routing.navigate(['signup']);
  }

}