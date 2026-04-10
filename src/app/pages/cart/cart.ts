import { Component, inject, OnInit, signal } from '@angular/core';
import { CartService } from '../../services/cart-services';
import { CartItemsService } from '../../services/cart-items-service';


@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  private cartService = inject(CartService);
  private cartitemservices = inject(CartItemsService)
  
  cart = signal <any|null>(null);
  isInitialLoad: boolean = true; 
  userId = 1
  ngOnInit(): void {
    this.loadCart(this.userId);
    
    
  }
 
  loadCart(userId:number){
    this.cartService.getByUSerId(userId).subscribe({
      next:(res:any) => {
        this.cart.set(res)
      }, 
      error:(err:any) =>{
        console.log(err);
        
      }
    })

  }
 

  updateQuantity(itemId: number, delta: number, actualqty:number) {
  const newQuantity = actualqty + delta;
  if (newQuantity <= 0) return;

  const request = {
    cartItemId: itemId,
    quantity: newQuantity,
    cartId: this.cart().id
    
  };

  this.cartitemservices.update(request).subscribe({
    next: (res:any) => {
     // this.cart.set(res)
     console.log('risposta update CartItem: +',res)
      this.loadCart(this.userId)
    },
    error: (err) => {
    console.log(err)
      
    }
  });
}


  
}

