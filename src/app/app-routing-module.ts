import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Homepage } from './pages/homepage/homepage';
import { About } from './pages/about/about';
import { Login } from './pages/login/login';
import { Signin } from './pages/signin/signin';
import { UserDetails } from './pages/user-details/user-details';
import { Products } from './pages/products/products';



const routes: Routes = [
  {path: '', component: Homepage},
  {path: 'about', component: About},
  {path: 'login', component: Login},
  {path: 'signup', component: Signin},
  {path: 'userDetails', component: UserDetails},
  {path: 'products', component: Products},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
