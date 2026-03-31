import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category-service';

@Component({
  selector: 'app-update-product',
  standalone: false,
  templateUrl: './update-product.html',
  styleUrl: './update-product.css',
})
export class UpdateProduct implements OnInit {
  productId = input.required<number>();

  private productService = inject(ProductService);
  private formBuilder = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  categoryList = signal<any[]>([]);

  productToUpdate = signal<any>({});

  productForm!: FormGroup;

  availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  ngOnInit(): void {
    this.categoryService.listAll().subscribe({
      next: (res: any) => {
        this.categoryList.set(res);
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });

    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      discount: [null],
      categoryId: [null, Validators.required],
      gender: ['', Validators.required],
      image: ['', Validators.required],
      material: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
    });

    this.productService.getById(this.productId()).subscribe({
      next: (res: any) => {
        this.productToUpdate.set(res);
        this.productForm.patchValue(res);
        if (res.category && res.category.id) {
          this.productForm.get('categoryId')?.setValue(res.category.id);
        }
      },
      error: (err: any) => console.log(err.error),
    });
  }

  onSubmit() {}
}
