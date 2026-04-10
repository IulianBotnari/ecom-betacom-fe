import { Component, Inject, ViewEncapsulation, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { CartItemsService } from '../../services/cart-items-service';
import { AuthenticationService } from '../../services/authentication-service';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.css'],
  standalone: false,
  encapsulation: ViewEncapsulation.None
})
export class ProductDetails {
  isAvaible: boolean = false;
  selectedSize: any = null;
  isAdding: boolean = false;

  // Iniezione dei servizi tramite inject()
  private cartItemsService = inject(CartItemsService);
  private authService = inject(AuthenticationService);
  private http = inject(HttpClient);
  private cartService = inject(CartService);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ProductDetails>
  ) {
    // Controllo disponibilità prodotto in base alle taglie
    if (this.data && this.data.sizes) {
      this.isAvaible = this.data.sizes.some((s: any) => s.quantity > 0);
    }
  }

  // Seleziona la taglia cliccata
  selectSize(size: any) {
    if (size.quantity > 0) {
      this.selectedSize = size;
    }
  }

    addToCart() {
      
      if (!this.selectedSize || this.isAdding) return;

      const userData = this.authService.getUserData();
      if (!userData || !userData.id) {
        alert("Effettua il login per continuare.");
        return;
      }

      this.isAdding = true;

    
      this.cartService.listAll().subscribe({
        next: (carts) => {
        
          const myCart = carts.find(c => {
            const cartUserId = c.user_id || (c.user && c.user.id) || c.userId;
            return cartUserId == userData.id;
          });

          if (!myCart) {
            console.error("Carrello non trovato per l'utente loggato.");
            alert("Errore: carrello non trovato nel database.");
            this.isAdding = false;
            return;
          }

        
          const cartItemBody = {
            cartId: myCart.id,
            productId: this.data.id,
            sizeId: this.selectedSize.id,
            quantity: 1
          };

          
          this.cartItemsService.create(cartItemBody).subscribe({
            next: (res) => {
              // Se il servizio risponde con successo (JSON)
              console.log('Prodotto aggiunto!', res);
              this.isAdding = false;
              this.close();
            },
            error: (err) => {
            
                console.error('Errore reale nel salvataggio:', err);
                alert("Errore durante l'aggiunta al carrello.");
                this.isAdding = false;
              
            }
          });
        },
        error: (err) => {
          console.error("Errore recupero carrelli:", err);
          this.isAdding = false;
        }
      });
    }

    close() {
      this.dialogRef.close();
    }
  }