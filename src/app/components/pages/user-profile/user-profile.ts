import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../../../models/user-model';
import { UserService } from '../../../services/user-service';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile implements OnInit{
  userForm!: FormGroup;
  user?: UserModel;
  activeTab: "profile" | "orders" = "profile";

  constructor(private fb: FormBuilder, private userService: UserService){}

  ngOnInit(): void {
    this.loadUser(1);
  }

  loadUser(id: number): void{
    this.userService.getById(id).subscribe({
      next: (data: any) => {
        this.user = data;
        this.initForm(data);
      },
      error: (err) => console.error("Could not fetch User", err)
    });
  }

  initForm(user: UserModel): void{
    this.userForm = this.fb.group({
      id: [user.id],
      name: [user.name, Validators.required],
      lastName: [user.lastName, Validators.required],
      email: [user.email, [Validators.required, Validators.email]]
    });
  }

  onUpdate(): void{
    if (this.userForm.valid){
      this.userService.update(this.userForm.value).subscribe(response => {
        alert(response);
      });
    }
  }
}
