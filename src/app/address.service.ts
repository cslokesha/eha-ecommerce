
import { Observable, observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseURL } from './conf'



@Injectable({
  providedIn: 'root'
})
export class AddressService {
  url2=BaseURL + "/v1/address/add"
   
  logindata =  sessionStorage.getItem('logincustomer');
  array = JSON.parse(this.logindata);
    header = new HttpHeaders( 
      {  
        'Content-Type': 'application/json' ,
        'Authorization': 'Bearer '+this.array.jwt
      
      });
 
  constructor(private httpclient: HttpClient) { }

  
  addaddress<Observable>(data){
    let logindata =  sessionStorage.getItem('logincustomer');
     return this.httpclient.post<Observable>(this.url2, data, { headers: this.header});
  }

}