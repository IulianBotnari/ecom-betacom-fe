import { WishlistService } from '../../services/wishlist-service';
import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetails } from '../product-details/product-details';

@Component({
  selector: 'app-wishlist',
  standalone: false,
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css',
})
export class Wishlist implements OnInit {
  products: any[] = [];

  filters: any = {
    name: '',
    gender: '',
    material: '',
    price: null,
  };

  constructor(
    private wishlistService: WishlistService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
  ) {}

  loading = true;

  ngOnInit(): void {
    this.wishlistService.listAll().subscribe({
      next: (res) => {
        this.products = res.map((r) => r.productId);
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  openDetails(product: any) {
    console.log('Il click funziona! Prodotto:', product);

    this.dialog.open(ProductDetails, {
      width: '90vw',
      maxWidth: '90vw',
      height: '90vh',
      panelClass: 'full-screen-dialog',
      data: product,
    });
  }

  // onFilter() {
  //   const cleanedFilters = this.cleanFilters(this.filters);
  //   this.productService.multiFilter(cleanedFilters).subscribe({
  //     next: (res) => {
  //       this.products = res;
  //       this.cdr.detectChanges();
  //     },
  //     error: (err) => console.error(err)
  //   });
  // }

  // cleanFilters(filters: any) {
  //   const cleaned: any = {};
  //   Object.keys(filters).forEach(key => {
  //     const value = filters[key];
  //     if (value !== null && value !== '') cleaned[key] = value;
  //   });
  //   return cleaned;
  // }
}
