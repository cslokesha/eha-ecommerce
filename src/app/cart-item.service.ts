import { Observable, observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseURL } from './conf'

@Injectable({
  providedIn: 'root'
})
export class CartItemService {
 
  url = "http://localhost:8080/cartitem/save";
  logindata =  sessionStorage.getItem('logincustomer');
  array = JSON.parse(this.logindata);
   header = new HttpHeaders( 
    {  
      'Content-Type': 'application/json' ,
      'Authorization': 'Bearer '+this.array.jwt
    
    });
 
  constructor(private httpclient: HttpClient) { }

  addcartItem<Observable>(data) {
 
    data = JSON.stringify(data)
    return this.httpclient.post<Observable>(this.url, data, { headers: this.header });
  }
 
  

}