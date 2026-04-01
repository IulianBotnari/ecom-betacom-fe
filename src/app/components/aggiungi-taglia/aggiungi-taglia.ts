import { Component, inject, input, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { SizeService } from '../../services/size-service';

@Component({
  selector: 'app-aggiungi-taglia',
  standalone: false,
  templateUrl: './aggiungi-taglia.html',
  styleUrl: './aggiungi-taglia.css',
})
export class AggiungiTaglia implements OnInit {
  productId = input.required<number>();

  private sizeServie = inject(SizeService);
  private formBuilder = inject(FormBuilder);

  taglie = ['XS', 'S', 'M', 'L', 'XL'];
  tagliaForm!: FormGroup;
  messageError = signal<string | null>(null)
  messageOk = signal<string | null>(null)
  ngOnInit(): void {
    this.tagliaForm = this.formBuilder.group({
      productId: [this.productId(), Validators.required],
      size: ['', Validators.required],
      quantity: [0, Validators.required],
    });
  }

  onSubmit() {
    if (this.tagliaForm.valid) {
      const sizeValue = this.tagliaForm.value;
      console.log("Dati inviati:", sizeValue);
      this.sizeServie.create(sizeValue).subscribe({
        next: (res: any) => {
          console.log(res);
          console.log("Id prodotto: "+ this.productId());
          
          this.messageOk.set(res);
          setTimeout(() => {
            this.messageOk.set(null);
          }, 5000);
        },
        error: (err: any) => {
          console.log(err);
          this.messageError.set(err);
          setTimeout(() => {
            this.messageError.set(null);
          }, 5000);
        },
      });
    }
  }
}
