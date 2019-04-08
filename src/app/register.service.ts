import { Observable, observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseURL } from './conf'



@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {
  url = BaseURL + "/v1/add";
  url1 = BaseURL + "/v1/signin";
  header = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private httpclient: HttpClient) { }

  register<Observable>(data) {
    data = JSON.stringify(data)
    return this.httpclient.post<Observable>(this.url, data, { headers: this.header });
  }
  logeedin<Observable>(data1) {
    console.log(data1)
    return this.httpclient.post<Observable>(this.url1, data1, { headers: this.header });

  }
}