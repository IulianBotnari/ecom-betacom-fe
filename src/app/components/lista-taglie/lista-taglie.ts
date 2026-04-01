import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { SizeService } from '../../services/size-service';

@Component({
  selector: 'app-lista-taglie',
  standalone: false,
  templateUrl: './lista-taglie.html',
  styleUrl: './lista-taglie.css',
})
export class ListaTaglie implements OnInit {
  private productService = inject(ProductService);
  private sizeService = inject(SizeService)

  productId = input.required<number>();
  sizeId = signal<number | null>(null)
  listaTaglie = signal<any[]>([]);
  createTaglia = signal<boolean>(false);
  updateTaglia = signal<boolean>(false)
  messageError = signal<string | null>(null)
  messageOk = signal<string | null>(null)

  ngOnInit(): void {
    this.productService.getById(this.productId()).subscribe({
      next: (res: any) => {
        this.listaTaglie.set(res.sizes);
        console.log('La lista delle taglie');
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  deleteTaglia(id: number) {
    this.sizeService.delete(id).subscribe({
      next: (res:any) =>{
        this.messageOk.set(res)
        setTimeout(()=>{
          this.messageOk.set(null)
        }, 5000)
      },
      error:(err:any)=>{
        this.messageError.set(err)
        setTimeout(()=>{
          this.messageError.set(null)
        },5000)
      }
    })
  }

  openCreateTaglia() {
    if (this.createTaglia() === false) {
      this.createTaglia.set(true);
   
    } else{
      this.createTaglia.set(false)
   
    }
  }

  openUpdateTaglia(id:number){
    if(this.updateTaglia() === false){
      this.updateTaglia.set(true)
         this.sizeId.set(id)
    } else {
      this.updateTaglia.set(false)
         this.sizeId.set(null)
    }
  }
}
