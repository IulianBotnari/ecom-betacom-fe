import { Component, Input } from '@angular/core';
import { ProductDetails } from '../product-details/product-details';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-card',
  standalone: false,
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  constructor(
        private dialog: MatDialog
  ) {}

  @Input() prodotto: any;

   openDetails(product: any) {
      console.log("Il click funziona! Prodotto:", product);
      
      this.dialog.open(ProductDetails, {
        width: '90vw',
        maxWidth: '90vw',
        height: '90vh',
        panelClass: 'full-screen-dialog',
        data: product
      });
  }
}
