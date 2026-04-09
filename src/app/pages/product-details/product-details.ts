import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.css'],
  standalone: false,
  encapsulation: ViewEncapsulation.None // Permette di gestire il dialog senza styles.css
})
export class ProductDetails {
  isAvaible: boolean = false;
  selectedSize: any = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ProductDetails>
  ) {
    console.log('Dati ricevuti nel dialog:', this.data);
    
    // Verifica disponibilità generale
    if (this.data && this.data.sizes) {
      this.isAvaible = this.data.sizes.some((s: any) => s.quantity > 0);
    }
  }

  // Seleziona la taglia se disponibile
  selectSize(size: any) {
    if (size.quantity > 0) {
      this.selectedSize = size;
    }
  }

  // Azione del carrello
  addToCart() {
    if (this.selectedSize) {
      console.log('Prodotto aggiunto:', this.data.name, 'Taglia:', this.selectedSize.size);
      // Qui aggiungerai la chiamata al tuo CartService
      this.close();
    }
  }

  close() {
    this.dialogRef.close();
  }
}