import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CategorieService {
  // Questo è l'URL che hai confermato dallo Swagger
  private url = "http://localhost:9090/rest/category/listAll"; 
  
 categorie = signal<any[]>([]);

  constructor(private http: HttpClient) { }

  list() {
    // Chiamiamo direttamente l'URL completo
    this.http.get<any[]>(this.url).subscribe({
      next: (data) => {
        console.log("Dati caricati con successo:", data);
        this.categorie.set(data);
      },
      error: (err) => {
        console.error("Errore di rete o CORS. Verifica la console del browser.", err);
      }
    });
  } 
}