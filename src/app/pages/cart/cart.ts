import { Component, computed, inject, OnInit, signal, effect } from '@angular/core';
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
  private cartitemservices = inject(CartItemsService);
  private orderServices = inject(OrderService);
  private userServices = inject(UserService);
  private orderItemServices = inject(OrderItemServices);

  cart = signal<any | null>(null);
  cartTotal = computed(() => {
    const currentCart = this.cart();
    if (!currentCart || !currentCart.cartItems) return 0;

    return currentCart.cartItems.reduce((acc: any, item: any) => {
      return acc + (item.product?.price || 0) * item.quantity;
    }, 0);
  });
  userId = Number(localStorage.getItem('userId'));
  user = signal<any | null>(null);
  addressUser = computed(() => {
    const user = this.user();
    if (user && user.addresses) {
      return user.addresses.find(
        (addr: any) =>
          addr.defaultAddress === true ||
          addr.defaultAddress === 'true' ||
          addr.defaultAddress === 1,
      );
    }
    return null;
  });

  ngOnInit(): void {
    this.loadCart(this.userId);
    this.loadUser(Number(localStorage.getItem('userId')));
  }

  loadUser(id: number) {
    this.userServices.getById(id).subscribe({
      next: (res: any) => {
        this.user.set(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  loadCart(userId: number) {
    this.cartService.getByUSerId(userId).subscribe({
      next: (res: any) => {
        this.cart.set(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  updateQuantity(itemId: number, delta: number, actualqty: number) {
    const newQuantity = actualqty + delta;
    if (newQuantity <= 0) return;

    const request = {
      cartItemId: itemId,
      quantity: newQuantity,
      cartId: this.cart().id,
    };

    this.cartitemservices.update(request).subscribe({
      next: (res: any) => {
        this.loadCart(this.userId);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  buy() {
    const currentAddress = this.addressUser();
    const currentCart = this.cart();
    const itemsToProcess = [...this.cart().cartItems];

    if (!currentAddress || !currentCart) return;

    const orderBody = {
      userId: this.userId,
      shippingAddress: currentAddress.id,
      paymentMethodId: 1,
      status: 'ORDINATO',
    };

    this.orderServices.create(orderBody).pipe(
        switchMap((newOrder: any) => {
          const itemsRequests = itemsToProcess.map((item: any) => {
            const detailPayload = {
              orderId: newOrder.id,
              productId: item.product.id,
              sizeId: item.size.id,
              quantity: item.quantity,
              totalPrice: item.quantity * (item.product.discount ?? item.product.price),
            };

            return this.orderItemServices.create(detailPayload);
          });

          return forkJoin(itemsRequests);
        }),
      )
      .subscribe({
        next: (results) => {
          this.loadCart(this.userId);
          alert('Ordine effettuato con successo!');
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
}
