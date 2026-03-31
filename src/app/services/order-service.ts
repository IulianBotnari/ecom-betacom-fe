import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  private http = inject(HttpClient)

  private url = 'http://localhost:9090/rest/orderDetails/'


      create (body: {}) {
      return this.http.post(this.url + "create", body)
    }

    update (body: {}) {
      return this.http.put(this.url + "update", body)
    }

    listAll () {
      return this.http.get(this.url + "listAll")
    }

    getById (id: number) {

      return this.http.get(this.url + "findById/" + id)
    }
    
    delete (id: number) {
      return this.http.delete(this.url + "delete/" + id, { responseType: 'text' })
    }


}
