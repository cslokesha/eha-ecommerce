


// import { PopupService } from './popup.service';
import { RegisterComponent } from './register/register.component';
// import { VliadationComponent } from './vliadation/vliadation.component';
// import { CartserviceService } from './cartservice.service';
import { Injectable,OnInit } from '@angular/core';
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
export class RegisterService { 
           myData:any;
           private _success = new Subject<string>();
           staticAlertClosed = false;
           successMessage: string;
  private userURL = "http://localhost:8087/v1";
  private headers = new Headers({'Content-Type' :'application/json'});
  private options = new RequestOptions({headers: this.headers})
  private userdata=[]; 
  constructor(private http: Http, private router: Router, private route: ActivatedRoute,private toastrService:ToastrService) { }

  public addCustomer=function(data) 
  { 
    let promise = new Promise((resolve, reject) => {
    return this.http.post( this.userURL+'/add', JSON.stringify(data), { headers: this.headers}).toPromise() .then(
      (res:Response) => { // Success
       // console.log(res);      
        this.userdata = res.json();
       
        console.log(this.userdata['status']);
     
       
        if(this.userdata['status'] == "SUCCESS")  
        {
         // this._success.next(`  user updated successfully `);
          this.popup.Success("user updated successfully");
         
        }
        else
        {     
          this.popup.Warning("Incorrect Data");
        }
       
      })
    })
  }
  public loginUser=function(data) 
  { 
    let promise = new Promise((resolve, reject) => {
    return this.http.post( this.userURL+'/signin', JSON.stringify(data), { headers: this.headers}).toPromise() .then(
      (res:Response) => { // Success
         
        this.userdata = res.json();
    
        // console.log(this.userdata['status']);
        // console.log(this.userdata['data']);
        alert(this.userdata['status'])
        if(this.userdata['status'] == "SUCCESS")  
        {
          this.router.navigate(['/addresslist'])
          localStorage.setItem("loginData",JSON.stringify(this.userdata['data']))

          this.myData = JSON.parse(localStorage.getItem("loginData"))
          console.log(this.myData.email)
         var us=this.userdata
         this.cartserviceService.cartitem();
         

    
        }
        else
        {     
        
        }
      
      })
    })
  }
  public resetpassword=function(data) 
  { 
    let promise = new Promise((resolve, reject) => {
    return this.http.put( this.userURL+'/resetPassword', JSON.stringify(data), { headers: this.headers}).toPromise() .then(
      (res:Response) => { // Success
       // console.log(res);      
        this.userdata = res.json();
       // console.log('userdata',this.userdata);
      //  console.log('userdata',this.userdata['password']);  
        console.log(this.userdata['status']);
        console.log(this.userdata['data']);
        alert(this.userdata['status'])
        if(this.userdata['status'] == "SUCCESS")  
        {
         
        // this.toastr.info('Login successful ','Customer');
          this.router.navigate(['/home']);
        }
        else
        {     
        // this.toastr.success('alredy Exist ','user');
        alert('Already Exist')
        }
        //catch(this.handleError);
      })
    })
  }

 
 


}