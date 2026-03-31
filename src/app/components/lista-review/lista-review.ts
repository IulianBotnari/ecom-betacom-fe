import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ProductService } from '../../services/product-service';

@Component({
  selector: 'app-lista-review',
  standalone: false,
  templateUrl: './lista-review.html',
  styleUrl: './lista-review.css',
})
export class ListaReview implements OnInit {

  private productService = inject(ProductService);
  productId = input.required<number>()

  listaReview = signal<any[]>([]);

  ngOnInit(): void {
    this.productService.getById(this.productId()).subscribe({
      next:(res:any) =>{
        console.log(res);
        
        this.listaReview.set(res.reviews)
        
      },
      error: (err:any)=>{
        console.log(err);
        
      }
    })
  }

  deleteReview(id:number){

  }
}
