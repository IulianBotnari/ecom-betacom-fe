import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CategoryService } from '../../services/category-service';

@Component({
  selector: 'app-homepage',
  templateUrl: 'homepage.html',
  styleUrl: 'homepage.css',
  standalone: false
})
export class Homepage implements OnInit {
  // Signals per lo stato
  genereSelezionato = signal<string>('donna');
  categorie = signal<any[]>([]);

  private catService = inject(CategoryService);

  ngOnInit(): void {
    // Avvia il caricamento dei dati all'inizializzazione
    this.loadCategories();
  }

  loadCategories() {
    this.catService.listAll().subscribe({
      next: (data) => {
        console.log("Dati caricati:", data);
        this.categorie.set(data);
      },
      error: (err) => {
        console.error("Errore nel caricamento categorie:", err);
      }
    });
  }

  /**
   * Computed: Reattivo ai cambiamenti di 'genereSelezionato' e 'categorie'
   */
  categorieFiltrate = computed(() => {
    const genere = this.genereSelezionato();
    const lista = this.categorie();

    return lista
      .filter(cat => cat.isView)
      .map(cat => {
        // Pulizia del nome per il path del file
        const nomeStandard = cat.category.toLowerCase().trim().replace(/\s+/g, '-');
        
        return {
          ...cat,
          immagineDinamica: `images/${genere}/${nomeStandard}/main.jpg`
        };
      });
  });

  cambiaGenere(nuovoGenere: string) {
    this.genereSelezionato.set(nuovoGenere);
  }

  /**
   * Gestione errori immagini
   */
  updateToPlaceholder(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    const placeholder = 'assets/images/placeholder.jpg'; // Assicurati che il path sia corretto

    // Evita loop infiniti se anche il placeholder fallisce
    if (imgElement.src.includes(placeholder)) {
      imgElement.style.display = 'none';
    } else {
      imgElement.src = placeholder;
    }
  }
}