import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CategoryService } from '../../services/category-service';

@Component({
  selector: 'app-homepage',
  templateUrl: 'homepage.html',
  styleUrl: 'homepage.css',
  standalone: false
})
export class Homepage implements OnInit {

  genereSelezionato = signal<string>('donna');
  categorie = signal<any[]>([]);

  private catService = inject(CategoryService);

  ngOnInit(): void {

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

  categorieFiltrate = computed(() => {
    const genere = this.genereSelezionato();
    const lista = this.categorie();

    return lista
      .filter(cat => cat.isView)
      .map(cat => {

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


  updateToPlaceholder(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    const placeholder = 'assets/images/placeholder.jpg'; 


    if (imgElement.src.includes(placeholder)) {
      imgElement.style.display = 'none';
    } else {
      imgElement.src = placeholder;
    }
  }
}