
import { Observable, observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseURL } from './conf'



@Injectable({
  providedIn: 'root'
})
export class OrderService {
  x= JSON.parse(localStorage.getItem('frm1'))
  
   
  logindata =  sessionStorage.getItem('logincustomer');
  array = JSON.parse(this.logindata);
    header = new HttpHeaders( 
      {  
        'Content-Type': 'application/json' ,
        'Authorization': 'Bearer '+this.array.jwt
      
      });
 
  constructor(private httpclient: HttpClient) { }

  
  placeorder<Observable>(data){
    let url2="http://localhost:8080/Orders/ordercreate/{email}/2";
     return this.httpclient.post<Observable>(url2+'/{paymentMode}'+'?email=' +this.array.email + '&paymentMode='+data.mode,data, { headers: this.header});
  }
  getallorders<Observable>(){
    let url3="http://localhost:8080/Orders/getOrderByCustomer/{email}?email="+this.array.email;
    return this.httpclient.get<Observable>(url3, { headers: this.header});
  }

}