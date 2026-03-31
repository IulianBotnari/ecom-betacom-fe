import { Component, ViewChild } from '@angular/core';
import { UserService } from '../../services/user-service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

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
  ) {}

  onSubmit() {
    const form = this.loginForm.value;

    console.log("Utente" + form.email)

    this.userService.login({
      email: form.email,
      password: form.password
    }).subscribe({
      next: ((r) => this.routing.navigate([''])),
      error: ((r) => console.log(r))
    })
  }

  signUp() {
    this.routing.navigate(['signup']);
  }

}