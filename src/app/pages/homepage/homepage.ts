
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common'; // <--- AGGIUNGI QUESTO IMPORT

@Component({
  selector: 'app-homepage',
  templateUrl: 'homepage.html',
  styleUrl: 'homepage.css',
  standalone: true,
  // AGGIUNGI CommonModule nell'array qui sotto
  imports: [MatCardModule, MatButtonModule, RouterModule, CommonModule], 
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Homepage {

current: string = 'donna'; 

  // 2. Database delle categorie con immagini (Cambia i percorsi con i tuoi)
  categoriesData = [
    { name: 'Borse', image_donna: '/images/prova.jpg', image_uomo: '/images/banner.jpg' },
    { name: 'Accessori', image_donna: '/images/prova.jpg', image_uomo: '/images/banner.jpg' },
    { name: 'Scarpe', image_donna: '/images/prova.jpg', image_uomo: '/images/banner.jpg' },
    { name: 'Abbigliamento', image_donna: '/images/prova.jpg', image_uomo: '/images/banner.jpg' }
  ];

  // 3. Funzione 'select' che viene chiamata al click del bottone
  select(genere: string) {
    this.current = genere;
  }

  // 4. Logica per filtrare le categorie e mostrare l'immagine corretta
  get filteredCategories() {
    return this.categoriesData.map(cat => ({
      name: cat.name,
      image: this.current === 'donna' ? cat.image_donna : cat.image_uomo
    }));
  }
}
