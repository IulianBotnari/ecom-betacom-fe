import { Component, effect, inject, input, Input, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-admin-user-update',
  standalone: false,
  templateUrl: './admin-user-update.html',
  styleUrl: './admin-user-update.css',
})
export class AdminUserUpdate implements OnInit {
  userId = input<any | null>(null);
  availableUserType = ['ADMIN', 'USER'];

  private userService = inject(UserService);

  userForm!: FormGroup;
  formBuilder = new FormBuilder();
  userDataById = signal<any>({});
  messageOk = signal<string | null>(null)
  messageError = signal<string | null>(null)

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      birthday: ['', Validators.required],
      codiceFiscale: ['', Validators.required],
      role: ['', Validators.required],
      phone: ['', Validators.required],
    });

    this.userService.getById(this.userId()).subscribe({
      next: (res: any) => {
        this.userDataById.set(res);
        this.userForm.patchValue(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const body = this.userForm.value;
      const payload = { ...body, id: this.userId() };

      this.userService.updateByAdmin(payload).subscribe({
        next: (res: any) => {
          this.messageOk.set("Aggiornamento effettuato")

          setTimeout(()=>{
            this.messageOk.set(null)
          }, 5000)
        },
        error: (err: any) => {
          this.messageError.set("Aggiornamento non riuscito")
          console.log(err);
          
          
          setTimeout(()=>{
            this.messageError.set(null)
          }, 5000)
        },
      });
    }
  }
}
