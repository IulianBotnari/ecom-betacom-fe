import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category-service';

@Component({
  selector: 'app-create-category',
  standalone: false,
  templateUrl: './create-category.html',
  styleUrl: './create-category.css',
})
export class CreateCategory implements OnInit {

  private formBuilder = inject(FormBuilder);
  private categoryService = inject(CategoryService);

  categoryForm!: FormGroup;
  

  messageError = signal<string>('');
  error = signal<boolean>(false);
  okMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      category: ['', [Validators.required, Validators.minLength(3)]],
      isView: [true] 
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      this.categoryService.create(this.categoryForm.value).subscribe({
        next: (res) => {
          this.okMessage.set('Categoria creata con successo!');
          this.error.set(false);
          this.categoryForm.reset({ isView: true }); 
        },
        error: (err) => {
          this.messageError.set('Errore durante la creazione della categoria.');
          this.error.set(true);
          this.okMessage.set(null);
        },
      });
    }
  }
}