import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  private url = 'http://localhost:8080/rest/category/'

  private http = inject(HttpClient)


  create(body:{}){
    return this.http.post(this.url + "create", body)
  }

  update(body:{}){
    return this.http.put(this.url + "update", body)
  }

  listAll(){
    return this.http.get(this.url + "listAll")
  }

  getById(id:number){
    return this.http.get(this.url + "findById/" + id)
  }

  delete(id:number){
    return this.http.delete(this.url + "delete/" + id)
  }


}
