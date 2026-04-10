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

    console.log("Utente" + form.email)

    this.userService.login({
      email: form.email,
      password: form.password
    }).subscribe({
      next: ((r:any) => {this.routing.navigate(['UserProfile/'+ r.id])

        this.authService.setLogin(r.id, r.role)
        console.log(r);
        
      }),
      error: ((r:any) => console.log(r))
    })
  }

  signUp() {
    this.routing.navigate(['signup']);
  }

}