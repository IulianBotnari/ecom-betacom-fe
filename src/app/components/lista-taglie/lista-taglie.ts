import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ProductService } from '../../services/product-service';

@Component({
  selector: 'app-lista-taglie',
  standalone: false,
  templateUrl: './lista-taglie.html',
  styleUrl: './lista-taglie.css',
})
export class ListaTaglie implements OnInit {
  private productService = inject(ProductService);
  productId = input.required<number>()

  listaTaglie = signal<any[]>([]);

  ngOnInit(): void {
    this.productService.getById(this.productId()).subscribe({
      next:(res:any) =>{
        this.listaTaglie.set(res.sizes)
        console.log("La lista delle taglie");
        
      },
      error: (err:any)=>{
        console.log(err);
        
      }
    })
  }

  deleteTaglia(id:number){

  }
}
