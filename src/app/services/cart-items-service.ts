import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartItemsService {
  private url = 'http://localhost:9090/rest/cartItem/'

  private http = inject(HttpClient)


  create(body: {}) {
  return this.http.post(this.url + "create", body, { 
    withCredentials: true, 
    responseType: 'text' 
  });
}

  update(body:{}){
    return this.http.put(this.url + "update", body,{withCredentials: true, responseType: 'text'})
  }

  listAll(){
    return this.http.get<any[]>(this.url + "listAll", {withCredentials: true})
  }

  getById(id:number){
    return this.http.get(this.url + "findById/" + id,{withCredentials: true})
  }

  delete(id:number){
    return this.http.delete(this.url + "delete/" + id,{withCredentials: true})
  }

}