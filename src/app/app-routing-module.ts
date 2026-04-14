import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Homepage } from './pages/homepage/homepage';
import { About } from './pages/about/about';
import { Login } from './pages/login/login';
import { UserDetails } from './pages/user-details/user-details';
import { Products } from './pages/products/products';
import { ProductDetails } from './pages/product-details/product-details';
import { UserProfile } from './pages/user-profile/user-profile';
import { Signin } from './pages/signin/signin';
import { Admin } from './pages/admin/admin';
import { Wishlist } from './pages/wishlist/wishlist';
import { Cart } from './pages/cart/cart';
import { authGuard } from './guard/auth-guard';

const routes: Routes = [
  { path: '', component: Homepage },
  { path: 'about', component: About },
  { path: 'login', component: Login },
  { path: 'signup', component: Signin },
  { path: 'userDetails', component: UserDetails },
  {
    path: 'UserProfile/:id',
    component: UserProfile,
    canActivate: [authGuard],
    data: { expectedRole: 'USER' },
  },
  { path: 'products', component: Products },
  { path: 'wishlist', component: Wishlist },
  { path: 'productDetails', component: ProductDetails },
  {
    path: 'admin',
    component: Admin,
    canActivate: [authGuard],
    data: { expectedRole: 'ADMIN' },
  },
  { path: 'cart', component: Cart },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
