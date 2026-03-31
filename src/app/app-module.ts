import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

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
import { CommonModule } from '@angular/common';
/* Angular Material */
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Signup } from './components/pages/signup/signup';
import { UserProfile } from './components/pages/user-profile/user-profile';

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
    Signup,
    UserProfile,
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
    ReactiveFormsModule,
  ],
  providers: [provideBrowserGlobalErrorListeners(), provideClientHydration(withEventReplay())],
  bootstrap: [App],
})
export class AppModule {}
