import { Component, inject, ViewChild } from '@angular/core';
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
  private userService = inject(UserService);
  private router = inject(Router);

  onSubmit() {
    if (this.signInForm.invalid) return;

    const formValues = this.signInForm.value;

    if (formValues.password !== formValues.passwordControl) {
      alert('Le due password non coincidono');
      return;
    }

    this.userService
      .create({
        name: formValues.name,
        lastName: formValues.lastName,
        email: formValues.email,
        birthday: formValues.birthday,
        codiceFiscale: formValues.codiceFiscale,
        password: formValues.password,
        phone: formValues.phone,
      })
      .subscribe({
        next: (r) => {
          console.log('Utente creato:', r);
          this.signInForm.resetForm();
        },
        error: (err) => console.error('Errore:', err),
      });
  }
}
