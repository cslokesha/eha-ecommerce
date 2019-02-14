
import { Injectable } from '@angular/core';
import { RegisterComponent } from './register/register.component';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
// import{AlertService} from '../app/alert.service';
import { Observable } from 'rxjs/Observable';   
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch'; 
import 'rxjs/add/observable/throw'; 
import {ToastrService} from 'ngx-toastr';
import {Subject} from 'rxjs'
import {debounceTime} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class FilterService { 
           myData:any;
           private _success = new Subject<string>();
           staticAlertClosed = false;
           successMessage: string;
  private userURL = "http://localhost:8086/v1/category/all";
  private headers = new Headers({'Content-Type' :'application/json'});
  private options = new RequestOptions({headers: this.headers})
  private userdata=[]; 
  constructor(private http: Http, private router: Router, private route: ActivatedRoute,private toastrService:ToastrService) { }

  public priceRange=function(data) 
  { 
    let promise = new Promise((resolve, reject) => {
    return this.http.post( this.userURL, JSON.stringify(data), { headers: this.headers}).toPromise() .then(
      (res:Response) => { // Success
       // console.log(res);      
        this.userdata = res.json();
       
        console.log(this.userdata['status']);
     
       
        if(this.userdata['status'] == "SUCCESS")  
        {
         alert("success")
         
        }
        else
        {     
        alert("error")
        }
       
      })
    })
  }
 
 


}