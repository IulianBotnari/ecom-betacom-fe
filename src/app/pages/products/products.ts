import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetails } from '../product-details/product-details'; // Assicurati che il percorso sia esatto

@Component({
  selector: 'app-products',
  templateUrl: './products.html',
  styleUrl: './products.css',
  standalone: false
})
export class Products implements OnInit {

  products: any[] = [];

  filters: any = {
    name: '',
    gender: '',
    material: '',
    price: null
  };

  // QUI C'ERA L'ERRORE: Devi aggiungere "private dialog: MatDialog"
  constructor(
    private productService: ProductService, 
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog // <--- AGGIUNTO QUESTO
  ) {}

  ngOnInit(): void {
    this.productService.listAll().subscribe({
      next: (res) => {
        this.products = res
        this.cdr.markForCheck();
      },
      error: (err) => console.error(err)
    });
  }

 openDetails(product: any) {
    console.log("Il click funziona! Prodotto:", product); // <--- Aggiungi questo
    
    this.dialog.open(ProductDetails, {
      width: '90vw',
      maxWidth: '90vw',
      height: '90vh',
      panelClass: 'full-screen-dialog',
      data: product
    });
}

  onFilter() {
    const cleanedFilters = this.cleanFilters(this.filters);
    this.productService.multiFilter(cleanedFilters).subscribe({
      next: (res) => {
        this.products = res;
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