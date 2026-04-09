import { Component, inject, OnInit, signal } from '@angular/core';
import { OrderService } from '../../services/order-service';


@Component({
  selector: 'app-order-details',
  standalone: false,
  templateUrl: './order-details.html',
  styleUrl: './order-details.css',
})
export class OrderDetails implements OnInit{


  private orderService = inject(OrderService)

  orderList = signal<any[]>([])


    ngOnInit(): void {
    this.orderService.listAll().subscribe({
      next: (res:any) => {
        this.orderList.set(res)
        
      },
      error: (err:any)=>{
        console.log(err);
        
      }
    })
  }


}
