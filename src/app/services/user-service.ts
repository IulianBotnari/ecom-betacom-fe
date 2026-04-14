import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { text } from 'stream/consumers';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'http://localhost:9090/rest/user/';

  constructor(private http: HttpClient) {}

  create(body: {}) {
    return this.http.post(this.url + 'create', body, { responseType: 'text' });
  }

  update(body: {}) {
    return this.http.put(this.url + 'update', body, {
      withCredentials: true,
      responseType: 'text',
    });
  }

  updateByAdmin(body: {}) {
    return this.http.put(this.url + 'updateByAdmin', body, {
      withCredentials: true,
      responseType: 'text',
    });
  }

  listAll() {
    return this.http.get(this.url + 'listAll', { withCredentials: true });
  }

  getById(id: number) {
    return this.http.get(this.url + 'findById/' + id, { withCredentials: true });
  }

  delete(id: number) {
    return this.http.delete(this.url + 'delete/' + id, { responseType: 'text' });
  }

  login(body: {}) {
    return this.http.post(this.url + 'login', body, { withCredentials: true });
  }

  multiFilter(filters: any) {
    return this.http.get<any[]>(this.url + 'multiFilter', {
      params: filters,
      withCredentials: true,
    });
  }

  logout() {
    return this.http.post('http://localhost:9090/rest/user/logout', {}, { withCredentials: true });
  }
}
