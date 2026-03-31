import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../services/order-service';

@Component({
  selector: 'app-order-details',
  standalone: false,
  templateUrl: './order-details.html',
  styleUrl: './order-details.css',
})
export class OrderDetails implements OnInit{


  private orderService = inject(OrderService)


    ngOnInit(): void {
    this.orderService.listAll().subscribe({
      next: (res:any) => {
        res.forEach((element:any) => {
          console.log(element);
          
          
        });
      }
    })
  }


}
