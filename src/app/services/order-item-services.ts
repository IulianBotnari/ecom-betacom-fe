import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderItemServices {
  private http = inject(HttpClient)

  private url = 'http://localhost:9090/rest/orderDetails/'


    create (body: {}) {
      return this.http.post(this.url + "create", body, { responseType: 'text' })
    }

    update (body: {}) {
      return this.http.put(this.url + "update", body, { responseType: 'text' })
    }

    listAll () {
      return this.http.get(this.url + "listAll", { withCredentials:true})
    }

    getById (id: number) {

      return this.http.get(this.url + "findById/" + id)
    }
    
    delete (id: number) {
      return this.http.delete(this.url + "delete/" + id, { responseType: 'text' })
    }

     getByUserId (id: number) {

      return this.http.get(this.url + "findByUserId/" + id)
    }
}
