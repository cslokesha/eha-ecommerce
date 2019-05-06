import { Observable, observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseURL } from './conf'



@Injectable({
  providedIn: 'root'
})
export class PaypalService {
  x= JSON.parse(localStorage.getItem('frm1'))
  
   
  public logindata =  sessionStorage.getItem('logincustomer');
  public array = JSON.parse(this.logindata);

    header = new HttpHeaders( 
      {  
        'Content-Type': 'application/json'
      
      });
 
  constructor(private httpclient: HttpClient) { }

  
  paypal<Observable>(){
    let dta=sessionStorage.getItem('logincustomer');
   alert("inside payment")
    let use="http://localhost:8080/v1/pay?addressId=2&paymentDesc=ded&email=l@gmail.com";
  
     return this.httpclient.post<Observable>(use,{ headers: this.header});
  }
   
  

}