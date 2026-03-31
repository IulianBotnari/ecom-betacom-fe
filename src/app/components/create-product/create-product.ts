import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product-service';
import { CategoryService } from '../../services/category-service';

@Component({
  selector: 'app-create-product',
  standalone: false,
  templateUrl: './create-product.html',
  styleUrl: './create-product.css',
})
export class CreateProduct implements OnInit {
  productForm!: FormGroup;

  availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  private formBuilder = inject(FormBuilder);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  messageError = signal<any>('');
  error = signal<boolean>(false);
  okMessage = signal<any | null>(null);

  categoryList = signal<any[]>([]);

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      discount: [null],
      categoryId: [null, Validators.required],
      gender: ['', Validators.required],
      image: ['', Validators.required],
      material: ['', Validators.required],
      size: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
    });

    this.categoryService.listAll().subscribe({
      next: (res: any) => {
        this.categoryList.set(res);
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const productData = this.productForm.value;

      this.productService.create(productData).subscribe({
        next: (res) => {
          console.log('Prodotto creato!', res);
          this.okMessage.set(res);
          setTimeout(() => {
            this.okMessage.set(null);
          }, 5000);
          this.productForm.reset();
        },
        error: (err) => {
          console.error('Errore durante la creazione', err.error);
          this.messageError.set(err.error);
          this.error.set(true);
          setTimeout(() => {
            this.error.set(false);
          }, 5000);
        },
      });
    } else {
      this.productForm.markAllAsTouched();
    }
  }
}
