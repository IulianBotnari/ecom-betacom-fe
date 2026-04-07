import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../services/cart';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  private cartService = inject(CartService);
  
  items: any[] = [];
  
  isInitialLoad: boolean = true; 

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.listAll().subscribe({
      next: (res: any) => {
        this.items = res;
      
        this.isInitialLoad = false; 
      },
      error: (err) => {
        console.error("Errore nel caricamento carrello", err);
        this.isInitialLoad = false;
      }
    });
  }

  onDelete(id: number): void {
    if (confirm("Sei sicuro di voler rimuovere questo articolo?")) {
      this.cartService.delete(id).subscribe({
        next: () => this.loadCart(),
        error: (err) => console.error("Errore durante l'eliminazione", err)
      });
    }
  }

  onUpdateQuantity(item: any, change: number): void {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      const body = { id: item.id, quantity: newQuantity };
      this.cartService.update(body).subscribe({
        next: () => this.loadCart(),
        error: (err) => console.error("Errore durante l'aggiornamento", err)
      });
    }
  }

  get total(): number {
    return this.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }
}