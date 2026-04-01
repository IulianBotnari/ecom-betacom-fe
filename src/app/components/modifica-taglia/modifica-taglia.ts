import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SizeService } from '../../services/size-service';

@Component({
  selector: 'app-modifica-taglia',
  standalone: false,
  templateUrl: './modifica-taglia.html',
  styleUrl: './modifica-taglia.css',
})
export class ModificaTaglia {
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
