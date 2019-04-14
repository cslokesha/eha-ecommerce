import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, PathLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './/app-routing.module';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';


import { AccountComponent } from './account/account.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { TestcomponentComponent } from './testcomponent/testcomponent.component';
import { HttpModule } from '@angular/http';
import { FormGroup, FormBuilder, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'

import { HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { TempComponent } from './temp/temp.component';
import { AboutusComponent } from './aboutus/aboutus.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    

    AccountComponent,
    ForgotPasswordComponent,
    ProductDetailsComponent,
    ProductListComponent,
    CartComponent,
    CheckoutComponent,
    TestcomponentComponent,
    AddressComponent,
    RegisterComponent,
    LoginComponent,
    TempComponent,
    AboutusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    HttpModule,
    HttpClientModule,

  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
