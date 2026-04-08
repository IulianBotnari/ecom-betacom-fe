import { Component, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { UserService } from '../../services/user-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-user-create',
  standalone: false,
  templateUrl: './admin-user-create.html',
  styleUrl: './admin-user-create.css',
})
export class AdminUserCreate {
  @ViewChild('signInForm') signInForm!: NgForm;
  disableSelect = new FormControl(false);

  constructor(
    private userService: UserService,
    private routing: Router,
  ) {}

  onSubmit() {
    const form = this.signInForm.value;

    if (form.password != form.passwordCntrl) {
      // this.msg.set("le due password non coincidono");
      return;
    }

    this.userService
      .create({
        name: form.name,
        lastName: form.lastName,
        email: form.email,
        birthday: form.birthday,
        codiceFiscale: form.codiceFiscale,
        password: form.password,
        phone: form.phone,
      })
      .subscribe({
        next: (r) => this.routing.navigate(['create']),
        error: (r) => console.log(r),
      });
  }
}
