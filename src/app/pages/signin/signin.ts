import { Component, ViewChild } from '@angular/core';
import { UserService } from '../../services/user-service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signin',
  standalone: false,
  templateUrl: './signin.html',
  styleUrl: './signin.css',
})
export class Signin {
  @ViewChild('signInForm') signInForm!: NgForm;

  constructor(
    private userService: UserService,
    private routing: Router,
  ) {}

  onSubmit() {
    this.userService.create({
      name: this.signInForm.value.name,
      lastName: this.signInForm.value.lastName,
      email: this.signInForm.value.email,
      birthday: this.signInForm.value.birthday,
      codiceFiscale: this.signInForm.value.codiceFiscale,
      password: this.signInForm.value.password,
      phone: this.signInForm.value.phone,
      role: 'USER'
    }).subscribe({
      next: ((r) => this.routing.navigate(['create'])),
      error: ((r) => console.log(r))
    })
  }
}
