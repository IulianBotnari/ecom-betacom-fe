import { Component, computed, inject, OnInit, signal,effect } from '@angular/core';
import { CartService } from '../../services/cart-services';
import { CartItemsService } from '../../services/cart-items-service';
import { OrderService } from '../../services/order-service';
import { UserService } from '../../services/user-service';
import { forkJoin, switchMap } from 'rxjs';
import { OrderItemServices } from '../../services/order-item-services';
import { error, log } from 'console';


@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  private cartService = inject(CartService);
  private cartitemservices = inject(CartItemsService)
  private orderServices = inject(OrderService)
  private userServices = inject (UserService)
  private orderItemServices = inject(OrderItemServices)

  cart = signal <any|null>(null);
  isInitialLoad: boolean = true; 
  
  cartTotal = computed(() => {
  return this.cart().cartItems.reduce((acc:any, item:any) => {
    return acc + (item.product?.price || 0) * item.quantity;
  }, 0);
});

  userId = Number( localStorage.getItem('userId'))
  user = signal <any|null>(null); 
  addressUser = computed(() => {
  const user = this.user();
  
  if (user && user.addresses) {
    
    return user.addresses.find((addr: any) => addr.defaultAddress === true);
  }
  
  return null; 
});

  ngOnInit(): void {
    this.loadCart(this.userId);
    this.loadUser(Number( localStorage.getItem('userId')))
    
  }

  loadUser(id:number){
    this.userServices.getById(id).subscribe({
      next:(res:any) => {
        this.user.set(res)
      }, 
      error: (err:any) =>{
        console.log(err)
      }
    }) 
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

buy() {
  console.log(this.addressUser());
  
  const orderBody = {
    userId: this.userId, 
    shippingAddress: this.addressUser().id,
    status: "ORDINATO"
  };

  this.orderServices.create(orderBody).pipe(
    
    switchMap((res) => {
      this.loadCart(this.userId);
      return this.orderServices.getByUserId(this.userId);
    }),

    
    switchMap((resOrder:any) => {
      
      const itemsRequests = this.cart().cartItems.map((item:any) => {
        const orderItemBody = {
          orderId: resOrder.id,
          productId: item.product.id,
          sizeId: item.size.id,
          quantity: item.quantity,
          totalPrice: item.quantity * (item.product.discount ?? item.product.price)
        };
        return this.orderItemServices.create(orderItemBody);
      });

      
      return forkJoin(itemsRequests);
    })
  ).subscribe({
    next: (results) => {
      console.log('Tutti i prodotti sono stati salvati:', results);
      
    },
    error: (err) => console.error('Errore durante il checkout:', err)
  });
}

   
}



  


