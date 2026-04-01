import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private url = 'http://localhost:8080/rest/product/'
  private http = inject(HttpClient)


  


    create (body: {}) {
      return this.http.post(this.url + "create", body, { responseType: 'text' })
    }

    update (body: {}) {
      return this.http.put(this.url + "update", body, { responseType: 'text' })
    }

    listAll () {
      return this.http.get<any[]>(this.url + "listAll");
    }

    multiFilter(filters: {}) {
      return this.http.get<any[]>(this.url + "multiFilter", {
        params: filters
      });
    }

    getById (id: number) {

      return this.http.get(this.url + "findById/" + id)
    }
    
    delete (id: number) {
      return this.http.delete(this.url + "delete/" + id, { responseType: 'text' })
    }

}
