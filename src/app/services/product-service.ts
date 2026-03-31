import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private url = 'http://localhost:9090/rest/product/'
  private http = inject(HttpClient)


  


    create (body: {}) {
      return this.http.post(this.url + "create", body, { responseType: 'text' })
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
