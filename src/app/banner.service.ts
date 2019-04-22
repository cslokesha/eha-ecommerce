import { Headers } from '@angular/http';
import { BaseURL } from './conf';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContentType } from '@angular/http/src/enums';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  private url = "http://localhost:8080/v1/control/getall";

  private testUrl = "http://localhost:8080/v1/banner/getall";

  private headers = new Headers({'Content-Type' :'application/json'});


  constructor(private httpClient : HttpClient) { }

  getall<Observable>(){
    return this.httpClient.get<Observable>(this.url);
  }
}
