
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
  public userurl="http://localhost:8080/v1/address/getAddressByCustomer/{email}?email="+this.array.email;
    header = new HttpHeaders( 
      {  
        'Content-Type': 'application/json' ,
        'Authorization': 'Bearer '+this.array.jwt
      
      });
 
  constructor(private httpclient: HttpClient) { }

  
  addaddress<Observable>(data){
    // let logindata =  sessionStorage.getItem('logincustomer');
     return this.httpclient.post<Observable>(this.url2, data, { headers: this.header});
  }

  
  getaddress<Observable>(){

    return this.httpclient.get(this.userurl);
  }
  getaddressById<Observable>(){
 let Id=   sessionStorage.getItem('addressid')
let  userurl1="http://localhost:8080/v1/address/get/"+Id;
    return this.httpclient.get(userurl1);
  }
  getorders<Observable>(){
    let Id=   sessionStorage.getItem('addressid')
   let  userurl2="http://localhost:8080/v1/Orders/getAllOrders";
       return this.httpclient.get(userurl2);
     }
     getone<Observable>(data){
      let Id=   sessionStorage.getItem('addressid')
     let  userurl2="http://localhost:8080/v1/Orders/getOrderDetailsByOrderId/{orderId}?orderId="+data;
         return this.httpclient.get(userurl2);
       }
       
       removeaddress(id:number){
        return this.httpclient.delete(`http://localhost:8080/v1/address/address/` + id);
      
      }
}