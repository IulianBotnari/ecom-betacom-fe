import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Homepage } from './pages/homepage/homepage';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { About } from './pages/about/about';
import { Login } from './pages/login/login';
import { Signin } from './pages/signin/signin';
import { Products } from './pages/products/products';
import { UserDetails } from './pages/user-details/user-details';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
/* Angular Material */
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { Admin } from './pages/admin/admin';
import { ListaUtenti } from './components/lista-utenti/lista-utenti';
import { ListaProdotti } from './components/lista-prodotti/lista-prodotti';
import { OrderDetails } from './components/order-details/order-details';
import { CreateProduct } from './components/create-product/create-product';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateProduct } from './components/update-product/update-product';
import { ListaTaglie } from './components/lista-taglie/lista-taglie';
import { ListaReview } from './components/lista-review/lista-review';
import { UserProfile } from './pages/user-profile/user-profile';
import { ProductDetails } from './pages/product-details/product-details';
import { AggiungiTaglia } from './components/aggiungi-taglia/aggiungi-taglia';
import { ModificaTaglia } from './components/modifica-taglia/modifica-taglia';
import { AdminUserCreate } from './components/admin-user-create/admin-user-create';
import { Cart } from './pages/cart/cart';
import { AdminUserUpdate } from './components/admin-user-update/admin-user-update';
import { ProductCard } from './pages/product-card/product-card';
import { Wishlist } from './pages/wishlist/wishlist';

@NgModule({
  declarations: [
    App,
    Header,
    Footer,
    About,
    Login,
    Signin,
    Products,
    UserDetails,
    Homepage,
    Admin,
    ListaUtenti,
    ListaProdotti,
    OrderDetails,
    CreateProduct,
    Homepage,
    UpdateProduct,
    ListaTaglie,
    ListaReview,
    UserProfile,
    ProductDetails,
    AggiungiTaglia,
    ModificaTaglia,
    AdminUserCreate,
    Cart,
    AdminUserUpdate,
    ProductCard,
    Wishlist,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    RouterModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgOptimizedImage,
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()),
  ],
  bootstrap: [App],
})
export class AppModule {}
