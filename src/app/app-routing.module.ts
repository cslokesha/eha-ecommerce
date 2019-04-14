import { AboutusComponent } from './aboutus/aboutus.component';
import { LoginComponent } from './login/login.component';
import { AddressComponent } from './address/address.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';


import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AccountComponent } from './account/account.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  {path :'register',  component :RegisterComponent},
  { path: 'address', component: AddressComponent },
  {path:'login',component:LoginComponent},
  {path:'aboutus',component:AboutusComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'account', component: AccountComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: 'product-list/:id', component: ProductListComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

