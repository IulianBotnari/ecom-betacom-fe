import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.css'],
  standalone: false  // <-- non standalone
})
export class ProductDetails implements OnInit {

  product: any = null;
  showReviews = false;
  reviews: any[] = [];
  selectedSize: string | null = null;
  quantity: number = 1;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')) || 1;

    // Prodotti di test con taglie, stock e recensioni
    const testProducts: any[] = [
      {
        id: 1,
        name: 'Sneakers Sportive',
        price: 79.99,
        image: 'https://via.placeholder.com/300',
        category: { category: 'Scarpe' },
        gender: 'Unisex',
        material: 'Pelle sintetica',
        description: 'Comode sneakers perfette per lo sport e il tempo libero.',
        sizes: ['36','37','38','39','40','41','42','43'],
        stock: 10,
        reviews: [
          { user: 'Marco', rating: 5, text: 'Ottime scarpe, molto comode!' },
          { user: 'Lucia', rating: 4, text: 'Design bello, ma un po’ strette.' }
        ]
      },
      {
        id: 2,
        name: 'Felpa Casual',
        price: 49.99,
        image: 'https://via.placeholder.com/300',
        category: { category: 'Abbigliamento' },
        gender: 'Donna',
        material: 'Cotone',
        description: 'Felpa morbida e confortevole, perfetta per l’inverno.',
        sizes: ['XS','S','M','L','XL'],
        stock: 5,
        reviews: [
          { user: 'Giulia', rating: 5, text: 'Calda e comoda, la adoro!' }
        ]
      }
    ];

    this.product = testProducts.find(p => p.id === id) || testProducts[0];
    this.reviews = this.product.reviews;
  }

  toggleReviews() {
    this.showReviews = !this.showReviews;
  }

  selectSize(size: string) {
    this.selectedSize = size;
  }

  addToCart() {
    if (!this.selectedSize) {
      alert("Seleziona una taglia prima di aggiungere al carrello!");
      return;
    }
    alert(`Aggiunto ${this.quantity} x ${this.product.name} (Taglia: ${this.selectedSize}) al carrello`);
  }

  goHome() {
    this.router.navigate(['/']);
  }
}