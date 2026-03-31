import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../services/product-service';

@Component({
  selector: 'app-lista-prodotti',
  standalone: false,
  templateUrl: './lista-prodotti.html',
  styleUrl: './lista-prodotti.css',
})
export class ListaProdotti implements OnInit {
  private productService = inject(ProductService);
  products = signal<any[]>([]);
  selectedProductId = signal<number | null>(null);
  selectedProductTaglie = signal<number | null>(null);
  selectedProductReview = signal<number | null>(null);
  

  loadProducts() {
    this.productService.listAll().subscribe({
      next: (res: any) => {
        this.products.set(res);
      },
      error: (res: any) => {
        console.log(res);
      },
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  deleteProduct(id: number) {
    this.productService.delete(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.loadProducts();
      },
      error: (res: any) => {
        console.log(res);
      },
    });
  }

  activeView = signal<ActiveView | null>(null);

  toggleView(id: number, type: 'update' | 'taglie' | 'review') {
  const current = this.activeView();
  if (current?.id === id && current?.type === type) {
    this.activeView.set(null);
  } else {
    this.activeView.set({ id, type });
  }
}

}

interface ActiveView {
  id: number;
  type: 'update' | 'taglie' | 'review';
}