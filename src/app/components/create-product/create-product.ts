import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product-service';

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

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      discount: [0],
      discountPercentage: [0],
      categoryId: [null, Validators.required],
      gender: ['', Validators.required],
      image: ['', Validators.required],
      material: ['', Validators.required],
      size: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const productData = this.productForm.value;

      this.productService.create(productData).subscribe({
        next: (res) => console.log('Prodotto creato!', res),
        error: (err) => console.error('Errore durante la creazione', err),
      });
    } else {
      this.productForm.markAllAsTouched();
    }
  }
}
