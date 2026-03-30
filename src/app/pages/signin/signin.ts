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
    const form = this.signInForm.value;

    if(form.password != form.passwordCntrl) {
      // this.msg.set("le due password non coincidono");
      return;
    }


    this.userService.create({
      name: form.name,
      lastName: form.lastName,
      email: form.email,
      birthday: form.birthday,
      codiceFiscale: form.codiceFiscale,
      password: form.password,
      phone: form.phone,
      role: 'USER'
    }).subscribe({
      next: ((r) => this.routing.navigate(['create'])),
      error: ((r) => console.log(r))
    })
  }
}
