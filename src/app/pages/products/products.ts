import { Component, ChangeDetectorRef, OnInit, inject } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { CategoryService } from '../../services/category-service'; // Import necessario per le categorie
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ProductDetails } from '../product-details/product-details';

@Component({
  selector: 'app-products',
  templateUrl: './products.html',
  styleUrl: './products.css',
  standalone: false
})
export class Products implements OnInit {

  // Liste per i dati
  products: any[] = [];
  categorieDisponibili: any[] = [];

  // Oggetto filtri sincronizzato con l'HTML
  filters: any = {
    name: '',
    gender: '',
    material: '',
    price: null,
    categoryId: null // Usiamo l'ID per il filtro del backend
  };

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // 1. Carichiamo tutte le categorie dal DB per popolare la mat-select dei filtri
    this.loadCategories();

    // 2. Ascoltiamo i parametri dell'URL (per chi arriva dalla Homepage)
    this.route.queryParams.subscribe(params => {
      if (params['categoryId']) {
        // Se c'è un ID nell'URL, lo impostiamo nei filtri e avviamo la ricerca
        this.filters.categoryId = Number(params['categoryId']);
        this.onFilter();
      } else {
        // Altrimenti carichiamo inizialmente tutti i prodotti
        this.loadAllProducts();
      }
    });
  }

  /**
   * Recupera la lista delle categorie dal server
   */
  loadCategories() {
    this.categoryService.listAll().subscribe({
      next: (res) => {
        this.categorieDisponibili = res;
        this.cdr.markForCheck();
      },
      error: (err) => console.error("Errore nel caricamento categorie:", err)
    });
  }

  /**
   * Carica tutti i prodotti senza filtri
   */
  loadAllProducts() {
    this.productService.listAll().subscribe({
      next: (res) => {
        this.products = res;
        this.cdr.markForCheck();
      },
      error: (err) => console.error("Errore caricamento prodotti:", err)
    });
  }

  /**
   * Esegue il filtro combinato inviando i dati al backend
   */
  onFilter() {
    const cleanedFilters = this.cleanFilters(this.filters);
    console.log("Filtri inviati al backend:", cleanedFilters);

    this.productService.multiFilter(cleanedFilters).subscribe({
      next: (res) => {
        this.products = res;
        this.cdr.detectChanges(); // Forza il refresh della UI
      },
      error: (err) => console.error("Errore durante il filtraggio:", err)
    });
  }

  /**
   * Pulisce l'oggetto filtri rimuovendo i campi vuoti o nulli
   */
  cleanFilters(filters: any) {
    const cleaned: any = {};
    Object.keys(filters).forEach(key => {
      const value = filters[key];
      // Includiamo il valore solo se non è una stringa vuota, null o undefined
      if (value !== '' && value !== null && value !== undefined) {
        cleaned[key] = value;
      }
    });
    return cleaned;
  }

  /**
   * Apre la modale con i dettagli del prodotto
   */
  openDetails(product: any) {
    console.log("Apertura dettagli per:", product);
    this.dialog.open(ProductDetails, {
      width: '90vw',
      maxWidth: '90vw',
      height: '90vh',
      panelClass: 'full-screen-dialog',
      data: product
    });
  }
}