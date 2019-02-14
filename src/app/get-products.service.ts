import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GetProductsService {

  private headers = new Headers({'Content-Type' :'application/json'})
  private options = new RequestOptions({headers: this.headers})
  private userdata=[]; 
  constructor(private http:Http) { }

  getProductsByCatagoryId(id:any){
    // console.log('#id');  
    // console.log(id);
    //   id = "68e09d92-7329-455d-af11-057a92d6a81f";

    // let url = "http://localhost:8086/v1/ProductBycategoryId/b8e6f0eb-9f66-4646-bd84-18cf56dabeae";

    let url1 =  "http://localhost:8086/v1/ProductBycategoryId/" + id;

    // console.log(url);
    
    // console.log(url1);
 
    let res = this.http.get(url1 , { headers: this.headers}).pipe(data => {
          return data;
        })
     return res;
   
  }

  getProductsByProductId(id:any){
    // console.log('#id');  
    // console.log(id);
      // id = "811ddcae-c278-445c-b301-647501845705"; 

    // let urlt = "http://localhost:8086/v1/productbyId/811ddcae-c278-445c-b301-647501845705";

     let urlp =  "http://localhost:8086/v1/productbyId/" + id;
    

    // console.log( ' url is ' + urlp);
    
   
 
    let res = this.http.get(urlp , { headers: this.headers}).pipe(data => {
          return data;
        })
     return res;
   
  }

}
