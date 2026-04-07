import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../../models/user-model';
import { UserService } from '../../services/user-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile implements OnInit{
  userForm!: FormGroup;
  user?: UserModel;
  //activeTab: "profile" | "orders" = "profile";
  activeView: string = "dashboard";
  openMenu: string | null = null;
  isEditing: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private userService: UserService,
    private route: ActivatedRoute){}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    if(id){
      this.loadUser(id);
    }
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
      email: [user.email, [Validators.required, Validators.email]],
      phone: [user.phone, Validators.required],
      birthday: [user.birthday],
      role: [{value: user.role, disabled: true}],
      codiceFiscale: [{value: user.codiceFiscale, disabled: true}]
    });
  }

  toggleMenu(menuId: string){
    this.openMenu = this.openMenu === menuId ? null : menuId;
  }

  setView(view: string){
    this.activeView = view;
    this.isEditing = !this.isEditing;
  }

  toggleEdit(){
    this.isEditing = !this.isEditing;
  }

  onUpdate(): void{
    if (this.userForm.valid){
      this.userService.update(this.userForm.value).subscribe(response => {
        alert(response);
        this.isEditing = false;
        this.loadUser(this.user!.id);
      });
    }
  }
}
