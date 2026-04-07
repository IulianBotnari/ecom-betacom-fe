import { Component, inject, input, OnInit, Output, signal, EventEmitter } from '@angular/core';
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

  @Output() productUpdated = new EventEmitter<void>();

  private productService = inject(ProductService);
  private formBuilder = inject(FormBuilder);
  private categoryService = inject(CategoryService);

  availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  categoryList = signal<any[]>([]);
  productToUpdate = signal<any>({});
  productForm!: FormGroup;
  selectedFile: File | null = null;
  selectedFileName = signal<string>('');
  imagePreview = signal<string | null>(null);

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
      material: ['', Validators.required],
    });

    this.productService.getById(this.productId()).subscribe({
      next: (res: any) => {
        this.productToUpdate.set(res);
        this.productForm.patchValue(res);
        this.imagePreview.set(res.image);
        if (res.category && res.category.id) {
          this.productForm.get('categoryId')?.setValue(res.category.id);
        }
      },
      error: (err: any) => console.log(err.error),
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formData = new FormData();

      const body = {
        id: this.productId(),
        ...this.productForm.value,
      };

      const productBlob = new Blob([JSON.stringify(body)], {
        type: 'application/json',
      });

      formData.append('product', productBlob);
      if (this.selectedFile != null) {
        formData.append('file', this.selectedFile);
      } 

      console.log('Dati che sto inviando:', body);

      this.productService.update(formData).subscribe({
        next: (res: any) => {
          console.log('Prodotto aggiornato con successo!', res);
          this.productUpdated.emit();
        },
        error: (err: any) => {
          console.error("Errore durante l'aggiornamento:", err.error);
        },
      });
    } else {
      this.productForm.markAllAsTouched();
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.selectedFileName.set(file.name);
      this.productForm.patchValue({ image: file });
      this.productForm.get('image')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => this.imagePreview.set(reader.result as string);
      reader.readAsDataURL(file);
    }
  }
}
