import { Response } from '@angular/http';

import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtResponse } from './jwt-response';
import { AuthLoginInfo } from './login-info';
import { SignUpInfo } from './signup-info';
// import { AddressInfo } from './address-info';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 private isLoggedIn:boolean=false;
public redirectUrl:String;


  private loginUrl = 'http://localhost:8086/v1/signin';
  private signupUrl = 'http://localhost:8086/v1/add';
  private addressUrl='http://localhost:8086/api/auth/address/add';

  constructor(private http: HttpClient,private router:Router) {
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions)
  
  // this.router.navigate(["/"]);
}

  

  

  signUp(info: SignUpInfo): Observable<string> {
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }
  // address(info: AddressInfo): Observable<string> {
  //   return this.http.post<string>(this.addressUrl, info, httpOptions);
  // }
}
