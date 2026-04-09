import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private http = inject(HttpClient)

  private url = 'http://localhost:9090/rest/cart/'

  create(body: {}) {
    return this.http.post(this.url + "create", body, { withCredentials: true })
  }

  update(body: {}) {
    return this.http.put(this.url + "update", body, { withCredentials: true })
  }

  listAll() {
    return this.http.get<any[]>(this.url + "listAll", { withCredentials: true })
  }

  getById(id: number) {
    return this.http.get(this.url + "findById/" + id, { withCredentials: true })
  }

  delete(id: number) {
    
    return this.http.delete(this.url + "delete/" + id, { 
      withCredentials: true, 
      responseType: 'text' 
    })
  }

   getByUSerId(id: number) {
    return this.http.get(this.url + "findByUserId/" + id, { withCredentials: true })
  }
}