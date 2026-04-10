import { Component, inject, OnInit, signal } from '@angular/core';
import { CartService } from '../services/cart-services';
import { CartItemServices } from '../services/cart-item-services';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  private cartService = inject(CartService);
  private cartitemservices = inject(CartItemServices)
  
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

  updateQuantity(item: any, delta: number) {
  const newQuantity = item.quantity + delta;
  if (newQuantity <= 0) return;

  const request = {
    cartItemId: item.id,
    quantity: newQuantity,
    cartId: this.cart().id,
    productId: item.product.id
  };

  this.cartitemservices.update(request).subscribe({
    next: (res:any) => {
     // this.cart.set(res)
      this.loadCart(this.cart().id)
    },
    error: (err) => {
    console.log(err)
      
    }
  });
}


  
}

