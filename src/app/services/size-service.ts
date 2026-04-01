import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SizeService {
  url = 'http://localhost:9090/rest/size/';

  private http = inject(HttpClient);

  listAll() {
    return this.http.get(this.url + 'listAll');
  }

  create(body: {}) {
    return this.http.post(this.url + 'create', body, { responseType: 'text' });
  }

  update(body: {}) {
    return this.http.put(this.url + 'update', body, { responseType: 'text' });
  }

  getById(id: number) {
    return this.http.get(this.url + 'findbyId/' + id);
  }

  delete(id: number) {
    return this.http.delete(this.url + 'delete', { responseType: 'text' });
  }
}
