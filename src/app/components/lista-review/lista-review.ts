import { AfterViewInit, Component, inject, input, OnInit, signal } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { UserService } from '../../services/user-service';
import { ReviewService } from '../../services/review-service';

@Component({
  selector: 'app-lista-review',
  standalone: false,
  templateUrl: './lista-review.html',
  styleUrl: './lista-review.css',
})
export class ListaReview implements OnInit, AfterViewInit {
  private productService = inject(ProductService);
  private userService = inject(UserService);
  private reviewService = inject(ReviewService);
  productId = input.required<number>();
  listaReview = signal<any[]>([]);
  messageError = signal<string | null>(null);
  messageOk = signal<string | null>(null);

  ngOnInit(): void {
    this.productService.getById(this.productId()).subscribe({
      next: (res: any) => {
        console.log(res);

        this.listaReview.set(res.reviews);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  ngAfterViewInit(): void {}

  deleteReview(id: number) {
    if (confirm('Vuoi eliminare la recensione ?')) {
      this.reviewService.delete(id).subscribe({
        next: (res: any) => {
          this.messageOk.set(res);
          setTimeout(() => {
            this.messageOk.set(null);
          }, 5000);
        },
        error: (err: any) => {
          this.messageError.set(err);
          setTimeout(() => {
            this.messageError.set(null);
          }, 5000);
        },
      });
    }
  }
}
