import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GetCatagorysService {

  // http header 
  private header = new Headers({ 'Content-Type': 'application/json ' });


  // inject the http instence
  constructor(private http: Http) {

  }

  getCategoryNames() {
    let url = 'https://eha-enterprise.herokuapp.com/v1/category/all';
    let res = this.http.get(url, { headers: this.header }).pipe(data => {
      // console.log(`#mapdata ${data}`);
      return data;
    });

    // console.log(`#res ${JSON.stringify(res)}`);
    return res;

  }

  filterObj = {
    blouse: "string",
    blouseColor: "string",
    blouseLength: 0,
    border: "string",
    borderType: "string",
    categoryName: "'dharmavaram'",
    colors: "string",
    discount: 0,
    fabricPurity: "string",
    length: 0,
    materialType: "string",
    max: 0,
    min: 0,
    pattern: "string",
    zariType: "string"
  }



  getProductsForFilter(catgoryName = 'string', min = 0, max = 0, discount = 0, colour = 'string') {
    if (catgoryName == "'undefined'") {
      this.filterObj.categoryName = 'string';
    } else {
      this.filterObj.categoryName = catgoryName;
    }

    this.filterObj.min = min;
    this.filterObj.max = max;
    this.filterObj.discount = discount;
    if (colour == "'undefined'") {
      this.filterObj.colors = 'string'
    } else {
      this.filterObj.colors = colour;
    }

    console.log('@@')
    console.log(this.filterObj)

    // console.log('@@')
    // console.log(this.filterObj.categoryName);
    // console.log(catgoryName)

    // console.log(' ##inside getProductsForFilter ');
    let data = JSON.stringify(this.filterObj);
    // console.log(data);
    let url = 'http://localhost:8086/v1/product/Filter1';
    let res = this.http.post(url, data, { headers: this.header }).pipe(data => {
      // console.log(`#mapdata ${data}`);
      return data;
    });

    // console.log(`#res ${res}`);
    return res;

  }



}
