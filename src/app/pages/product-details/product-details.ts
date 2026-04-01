import { Component, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.css'],
  standalone: false
})
export class ProductDetails implements OnInit {

  // Dati finti
  product = signal<any>({
    id: 1,
    name: 'Maglietta Demo',
    price: 29.99,
    category: { category: 'T-Shirt' },
    gender: 'UNISEX',
    material: 'Cotone',
    description: 'Questa è una maglietta demo per testare la pagina Product Details.',
    image: 'https://via.placeholder.com/300x300',
    sizes: ['XS','S','M','L','XL'],
    stock: 10
  });

  selectedSize: string | null = null;
  quantity: number = 1;

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  selectSize(size: string) {
    this.selectedSize = size;
  }

  addToCart() {
    if (!this.selectedSize) {
      alert("Seleziona una taglia prima di aggiungere al carrello!");
      return;
    }
    //alert(Aggiunto ${this.quantity} x ${this.product().name} (Taglia: ${this.selectedSize}) al carrello);
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
