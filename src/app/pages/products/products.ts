import { Component, ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../../services/product-service';

@Component({
  selector: 'app-products',
  templateUrl: './products.html',
  styleUrl: './products.css',
  standalone: false
})
export class Products {

  products: any[] = [];

  filters: any = {
    name: '',
    gender: '',
    material: '',
    price: null
  };

  constructor(private productService: ProductService, private cdr: ChangeDetectorRef) {
    this.productService.listAll().subscribe({
      next: (res) => this.products = res,
      error: (err) => console.error(err)
    })
  }

  onFilter() {
    const cleanedFilters = this.cleanFilters(this.filters);

    this.productService.multiFilter(cleanedFilters).subscribe({
      next: (res) => {
        this.products = res;

        // forza Angular a rilevare il cambiamento subito
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  cleanFilters(filters: any) {
    const cleaned: any = {};
    Object.keys(filters).forEach(key => {
      const value = filters[key];
      if (value !== null && value !== '') cleaned[key] = value;
    });
    return cleaned;
  }
}