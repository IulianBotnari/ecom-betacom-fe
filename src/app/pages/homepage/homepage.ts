import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product-service';

@Component({
  selector: 'app-homepage',
  standalone: false,
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage implements OnInit {


  private productService = inject(ProductService)

  private products = this.productService.products()
  private messageError = this.productService.messageError()

  ngOnInit(): void {
    this.productService.listAll()
  }




}
