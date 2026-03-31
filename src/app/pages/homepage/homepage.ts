import { Component, OnInit, signal, computed } from '@angular/core';
import { CategorieService } from '../../services/category.service';

@Component({
  selector: 'app-homepage',
  templateUrl: 'homepage.html',
  styleUrl: 'homepage.css',
  standalone: false
})  
export class Homepage implements OnInit {
  // Signal per gestire il genere (donna di default)
  genereSelezionato = signal<string>('donna'); 

  constructor(private catService: CategorieService) { }

  ngOnInit(): void {
    // Carica le categorie dal database tramite il service
    this.catService.list();
  }

  /**
   * Computed: Crea la lista di categorie iniettando i percorsi immagine.
   * REGOLE PER IL FUNZIONAMENTO:
   * 1. Prende il nome dal DB (es: "Camicie")
   * 2. Lo trasforma in minuscolo (es: "camicie")
   * 3. Cerca il file in: images/donna/camicie/main.jpg
   */
  categorieFiltrate = computed(() => {
    const genere = this.genereSelezionato();
    const categorieView = this.catService.categorie().filter((cat)=>cat.isView);



    return categorieView.map(cat => {
      // Trasforma il nome del DB in minuscolo senza spazi (es: "Magliette " -> "magliette")
      const nomeStandard = cat.category.toLowerCase().trim();

      return {
        ...cat,
        // Percorso dinamico basato sul nome esatto della categoria
        immagineDinamica: `images/${genere}/${nomeStandard}/main.jpg`
      };
    });
  });

  // Metodo per cambiare il genere dai bottoni
  cambiaGenere(nuovoGenere: string) {
    this.genereSelezionato.set(nuovoGenere);
  }

  /**
   * Gestore errori immagini:
   * Se 'main.jpg' non esiste nella cartella specifica, carica il placeholder generico.
   */
  updateToPlaceholder(event: any) {
    const imgElement = event.target;
    
      // Se manca anche il placeholder, nascondiamo l'immagine per non mostrare l'icona "rotta"
      imgElement.style.display = 'none';
      console.warn("Immagine non trovata e placeholder mancante in images/placeholder.jpg");
    }
  }

 
 
