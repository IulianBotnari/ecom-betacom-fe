import { ChangeDetectorRef, Component, Inject, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CartItemsService } from '../../services/cart-items-service';
import { AuthenticationService } from '../../services/authentication-service';
import { WishlistService } from '../../services/wishlist-service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.css'],
  standalone: false,
  encapsulation: ViewEncapsulation.None // Permette di gestire il dialog senza styles.css
})
export class ProductDetails implements OnInit {
  isAvaible: boolean = false;
  selectedSize: any = null;
  isFavorite = signal(false);
  user: any = null;
  productInWishlist: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public product: any,
    private dialogRef: MatDialogRef<ProductDetails>,
    private serviceWishlist: WishlistService,
    private serviceAuth: AuthenticationService
  ) {
    console.log('Dati ricevuti nel dialog:', this.product);
    console.log("dati dell'utente", serviceAuth.getUserData().id)
    
    // Verifica disponibilità generale
    if (this.product && this.product.sizes) {
      this.isAvaible = this.product.sizes.some((s: any) => s.quantity > 0);
    }
    this.user = serviceAuth.getUserData();
  }

  ngOnInit(): void {
    this.syncWishlist().subscribe((isFav) => this.isFavorite.set(isFav));
  }

  syncWishlist(): Observable<boolean> {
  return this.serviceWishlist.listAll().pipe(
    map((r) => {
      this.productInWishlist = r.find(
        (a) =>
          a.userId === Number(this.user.id) &&
          a.productId?.id === this.product?.id
      );

      return this.productInWishlist != null;
    })
  );
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
      console.log('Prodotto aggiunto:', this.product.name, 'Taglia:', this.selectedSize.size);
      // Qui aggiungerai la chiamata al tuo CartService
      this.close();
    }
  }

  close() {
    this.dialogRef.close();
  }

  addToFavorites() {
    if (!this.user) return;

    const prev = this.isFavorite();
    this.isFavorite.set(!prev); // optimistic

    const request$ = prev
      ? this.serviceWishlist.delete(this.productInWishlist.id)
      : this.serviceWishlist.create({
          userId: this.user.id,
          productId: this.product.id
        });

    request$.subscribe({
      next: () => {
        if (prev) {
          // DELETE
          this.productInWishlist = null;
          this.isFavorite.set(false);
        } else {
          // CREATE
          this.syncWishlist().subscribe((isFav) => this.isFavorite.set(isFav));
        }
      },
      error: () => {
        this.isFavorite.set(prev); // rollback
      }
    });
  }

  // addToFavorites() {
  //   if (!this.user) return;

  //   // this.addOrRemoveFavorite().subscribe();
  //   const prev = this.isFavorite();

  //   this.isFavorite.set(!prev);

  //   if(prev) {
  //     this.serviceWishlist.delete(this.productInWishlist.id).subscribe({
  //       next: ((r) => {
  //         console.log("eliminazione avvenuta con successo");
  //         this.productInWishlist = undefined;
  //         this.isFavorite.set(false);
  //       }),
  //       error: ((r) => {
  //         console.log("eliminazione falllita");
  //         console.log(r);
  //         this.isFavorite.set(true);
  //       })
  //     })
  //   } else {
  //     this.serviceWishlist.create({
  //         userId: this.user.id,
  //         productId: this.product.id
  //       }).subscribe({
  //         next: ((r) => {
  //           console.log("salvataggio avvenuto con successo");
  //           console.log("result", r);
  //           this.addOrRemoveFavorite().subscribe();
  //           this.isFavorite.set(true);
  //         }),
  //         error: ((r) => {
  //           console.log("salvataggio fallito");
  //           console.log("result", r);
  //           this.isFavorite.set(false);
  //         })
  //       })
  //   }
  // }
}