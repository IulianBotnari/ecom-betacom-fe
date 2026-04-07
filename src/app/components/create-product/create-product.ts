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
  selectedFile: File | null = null;
  selectedFileName = signal<string>('');
  imagePreview = signal<string | null>(null);

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

  onSubmit() {
    if (this.productForm.valid && this.selectedFile) {
      const formData = new FormData();

  
      const productData = { ...this.productForm.value };
      delete productData.image;


      const productBlob = new Blob([JSON.stringify(productData)], {
        type: 'application/json',
      });


      formData.append('product', productBlob);
      formData.append('file', this.selectedFile);

      this.productService.create(formData).subscribe({
        next: (res) => {
          this.okMessage.set('Prodotto creato con successo!');
          this.resetForm();
        },
        error: (err) => {
          this.messageError.set('Errore durante la creazione.');
          this.error.set(true);
        },
      });
    }
  }
  resetForm() {
    this.productForm.reset();
    this.selectedFile = null;
    this.selectedFileName.set('');
    this.imagePreview.set(null);
  }
}
