import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.css'],
  standalone: false // o true a seconda del tuo progetto
})
export class ProductDetails{

  isAvaible:boolean =false;
  

  // Il trucco è tutto qui: Injection dei dati
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ProductDetails>
  ) {
    // Ora puoi usare "data" nel tuo HTML per mostrare nome, prezzo, ecc.
    console.log('Dati ricevuti nel dialog:', this.data);
   this.data.sizes.forEach((element: any) => {
      element.quantity > 0 ? this.isAvaible=true : this.isAvaible = false;
    });
  }

  close() {
    this.dialogRef.close();
  }
}