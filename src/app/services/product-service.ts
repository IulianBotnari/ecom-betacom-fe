import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { response } from 'express';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private url = 'http://localhost:8080/rest/product'
  private http = inject(HttpClient)

  products = signal<any[]>([])
  product= signal<any>({})

  messageError = signal<any>({})

  


    create (body: {}) {
      return this.http.post(this.url + "create", body).pipe(tap(()=> this.listAll()));
    }

    update (body: {}) {
      return this.http.put(this.url + "update", body).pipe(tap(()=> this.listAll()));
    }

    listAll () {
      this.messageError.set(null);
      return this.http.get(this.url + "listAll").subscribe(
        {
          next: (response: any) => {this.products.set(response)},
          error: (response:any) => {
            console.log(response)
            this.messageError.set(response)
          }
        }
      );
    }

    getById (id: number) {
      this.messageError.set(null);
      return this.http.get(this.url + "findById/" + id).subscribe(
        {
          next: (response:any) => {this.product.set(response)},
          error: (response:any) => {
            console.log(response)
            this.messageError.set(response)
          }
        }
      );
    }
    
    delete (id: number) {
      return this.http.get(this.url + "delete/" + id).pipe(tap(()=> this.listAll()));
    }

}
