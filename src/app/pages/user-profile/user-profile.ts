import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  get addressGroups(){
    return this.userForm.get("addresses") as FormArray;
  }

  get paymentGroups(){
    return this.userForm.get("paymentMethods") as FormArray;
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
      password: [user.password, Validators.required],
      phone: [user.phone, Validators.required],
      birthday: [user.birthday],
      role: [{value: user.role, disabled: true}],
      codiceFiscale: [{ value: user.codiceFiscale, disabled: true }],

      addresses: this.fb.array(user.addresses.map(addr => this.fb.group({
        id: [addr.id],
        city: [addr.city, Validators.required],
        street: [addr.street, Validators.required],
        cap: [addr.cap, Validators.required],
        province: [addr.province, Validators.required],
        defaultAddress: [addr.defaulAddress],
        residence: [addr.residence],
        domicile: [addr.domicile]
      }))),

      paymentMethods: this.fb.array(user.paymentMethods.map(pm => this.fb.group({
        id: [pm.id],
        description: [pm.description],
        card: this.fb.group({
          cardNumber: [pm.card.cardNumber, [Validators.required, Validators.pattern("^[0-9]{16}$")]],
          expiryDate: [pm.card.expiryDate, Validators.required],
          cardHolder: [pm.card.cardHolder, Validators.required],
          cvv: [pm.card.cvv, [Validators.required, Validators.pattern("^[0-9]{3}$")]]
        })
      })))
    });
  }

  toggleMenu(menuId: string){
    this.openMenu = this.openMenu === menuId ? null : menuId;
  }

  setView(view: string){
    this.activeView = view;
    this.isEditing = false;
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

  onCheckboxChange(controlName: string, index: number){
    const addresses = this.addressGroups;

    for (let i = 0; i < addresses.length; i++){
      if(i !== index){
        addresses.at(i).get(controlName)?.setValue(false);
      }
    }
  }
}
