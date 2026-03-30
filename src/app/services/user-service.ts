import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
    private url = "http://localhost:9090/rest/user/";

    constructor(private http: HttpClient) {}

    create (body: {}) {
      return this.http.post(this.url + "create", body);
    }

    update (body: {}) {
      return this.http.put(this.url + "update", body);
    }

    listAll () {
      return this.http.get(this.url + "listAll");
    }

    getById (id: number) {
      return this.http.get(this.url + "findById/" + id);
    }
    
    delete (id: number) {
      return this.http.get(this.url + "delete/" + id);
    }

    login (body: {}) {
      return this.http.post(this.url + "login", body);
    }
}
