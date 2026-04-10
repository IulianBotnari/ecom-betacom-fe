import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private url = 'http://localhost:9090/rest/cart/'

  private http = inject(HttpClient)



  update(body:{}){
    return this.http.put(this.url + "update", body,{withCredentials: true})
  }

  listAll(){
    return this.http.get<any[]>(this.url + "listAll", {withCredentials: true})
  }

  findById(id:number){
    return this.http.get(this.url + "findById/" + id,{withCredentials: true})
  }

  delete(id:number){
    return this.http.delete(this.url + "delete/" + id,{withCredentials: true})
  }

}