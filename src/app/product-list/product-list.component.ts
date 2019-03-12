// import { FilterService } from './../filter.service';

import { GetCatagorysService } from './../get-catagorys.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { GetProductsService } from '../get-products.service';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {


  private catagoryId: any;
  private min = 1;
  private max = 0;
  private discount = 0;
  private selectedColours: any;
  private globalFilteredcategorynames: any;

  productsObj: any;
  globalFilteredcategorynamesFlag: boolean;
  catagories = [];
  filteredCatagories = [];
  indexes = [];
  formobjects = [];
  categorynameobj = [];
  colours = ['red', 'green', 'blue'];
  colourFilter = [];
  // PAGINATION 
  // product frame stores 6 product objects in an array 
  productAllFrames: any = [];
  // @view pagination products 
  frameInDisplay = [];
  //@view pagination indeix
  pageIndexes = [];








  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private getproduct: GetProductsService,
    private router: Router,
    private getCatagoryName: GetCatagorysService,
    //  private filterService:FilterService
  ) {

    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.ngOnInit();
      }


    })


    // get catagory objects in array   and put it to categorynameobj
    this.getCatagoryName.getCategoryNames().subscribe((resObj) => {


      let res: any = resObj;
      let response = JSON.parse(res._body);


      this.categorynameobj = response.data;
      // console.log(this.categorynameobj)

      // console.log('inside ngAfterViewInit');
      // console.log(this.categorynameobj.length);
      for (let i = 0; i < this.categorynameobj.length; i++) {
        this.catagories[i] = this.categorynameobj[i]["categoryName"];

      }

      this.constructForm();
    });
    // getCatagoryName






  }

  constructForm() {
    for (let index = 0; index < this.catagories.length; index++) {
      this.indexes[index] = index;
      this.formobjects[index] = new FormControl('');

    }
  }
  // CREATES THE RESULT OF A CATAGORY SELECTION 
  filterChanged(formObj, index) {

    if (formObj.value == true && !this.checkResultArray(index)) {
      this.filteredCatagories.push(this.catagories[index]);
    }
    else if (this.checkResultArray(index)) {
      let i = this.filteredCatagories.indexOf(this.catagories[index])
      if (i > -1) {
        this.filteredCatagories.splice(i, 1);
      }

    }
    let result = this.filteredCatagories;
    console.log(' ## this.filteredCatagories')
    console.log(this.filteredCatagories);

    // CHANGE THE LIST OF SELECTED CATAGORY TO STRING
    // let result = '';
    // for (let k = 0; k < this.filteredCatagories.length - 1; k++) {
    //   result = result + "'" + this.filteredCatagories[k] + "'" + ',';
    // }
    // result = result + "'" + this.filteredCatagories[this.filteredCatagories.length - 1] + "'";

    // result = result + ''

    // console.log(result);

    this.globalFilteredcategorynames = result;

    console.log('## globalFilteredcategorynames')
    console.log(this.globalFilteredcategorynames);

    if (this.globalFilteredcategorynames.length == 0)
      this.globalFilteredcategorynamesFlag = false;
    else
      this.globalFilteredcategorynamesFlag = true;
    this.getDataForFilter(this.filteredCatagories);


  }


  // price filter implimentation 
  priceFilterChange() {

    // console.log('# inside  priceFilterChange');
    // console.log(this.max);
    // console.log(this.min);
    this.getCatagoryName.getProductsForFilter(this.globalFilteredcategorynames, this.min, this.max, this.discount, this.selectedColours).subscribe((resObj) => {
      let res: any = resObj;
      let response = JSON.parse(res._body);
      this.productsObj = response.data;
      console.log('## this.productsObj')
      console.log(this.productsObj);
      //PAGINATION 
      this.pagination();


    });

  }
  // to implement price filter after choosing catagory


  getDataForFilter(catgoryName) {

    console.log('calling service to get products for catagory name  ' + "   " + catgoryName);



    this.getCatagoryName.getProductsForFilter(this.globalFilteredcategorynames, this.min, this.max, this.discount, this.selectedColours).subscribe(resObj => {
      //  console.log('#resObj');
      //  console.log(resObj);

      let res: any = resObj;
      let response = JSON.parse(res._body);
      // console.log('-------@@------ response')
      // console.dir(response);

      this.productsObj = response.data;
      console.log('## this.productsObj')
      console.log(this.productsObj);
      //PAGINATION 
      this.pagination();

      //  console.log( 'this.productsObj');
      //  console.log( this.productsObj);


    })


  }

  checkResultArray(index) {
    for (let j = 0; j < this.filteredCatagories.length; j++) {
      if (this.filteredCatagories[j] == this.catagories[index])
        return true;
    }
    return false;
  }





  ngOnInit() {
    //get  catagoryid from the URL 
    this.getCatagoryIdFromRouteURL();
    //get list of products for that catagoryid
    //put it in  productsObj




  }



  getCatagoryIdFromRouteURL() {
    this.catagoryId = this.route.snapshot.paramMap.get('id');
    // console.log('#cid');
    // console.dir(this.catagoryId);
    // console.dir( typeof this.catagoryId);
    this.getProductsForCatagoryId(this.catagoryId);
  }

  getProductsForCatagoryId(catagoryId) {

    this.getproduct.getProductsByCatagoryId(catagoryId).subscribe(resObj => {
      //  console.log('#resObj');
      //  console.log(resObj);

      let res: any = resObj;
      let response = JSON.parse(res._body);
      // console.log('-------@@------ response')
      // console.dir(response);

      this.productsObj = response.data;
      console.log('## this.productsObj')
      console.log(this.productsObj);
      //PAGINATION 
      this.pagination();

      console.log('this.productsObj');
      console.log(this.productsObj);


    })

  }
  discountChanged(discount = 1) {
    console.log('## discount')
    console.log(discount)
    console.log(typeof discount)

    discount = Number(discount);
    this.discount = discount;
    console.log(typeof discount)


    this.getCatagoryName.getProductsForFilter(this.globalFilteredcategorynames, 0, 0, this.discount, this.selectedColours).subscribe((resObj) => {
      let res: any = resObj;
      let response = JSON.parse(res._body);
      this.productsObj = response.data;

      console.log('## this.productsObj')
      console.log(this.productsObj);
      //PAGINATION 
      this.pagination();

    });

  }

  // COLOUR FILTER

  colourChanged(inputObj) {

    console.log('# inputObj')
    if (inputObj.value == true && !this.checkentry(inputObj.name)) {
      console.log('checked' + '  ' + inputObj.name);
      this.colourFilter.push(inputObj.name);

    } else {
      console.log('removed' + '  ' + inputObj.name);
      let index = this.colourFilter.indexOf(inputObj.name);
      if (index > -1) {
        this.colourFilter.splice(index, 1);
      }

    }

    console.log(this.colourFilter);

    // CHANGE THE LIST OF SELECTED CATAGORY TO STRING
    let result = '';
    //  for (let k = 0; k < this.colourFilter.length - 1; k++) {
    //    result = result + "'" + this.colourFilter[k] + "'" + ',';
    //  }
    //  result = result + "'" + this.colourFilter[this.colourFilter.length - 1] + "'";

    //  result = result + ''
    this.selectedColours = this.colourFilter;
    console.log(result);



    this.getCatagoryName.getProductsForFilter(this.globalFilteredcategorynames, 0, 0, this.discount, this.selectedColours).subscribe(resObj => {
      //  console.log('#resObj');
      //  console.log(resObj);

      let res: any = resObj;
      let response = JSON.parse(res._body);
      // console.log('-------@@------ response')
      // console.dir(response);

      this.productsObj = response.data;

      console.log('## this.productsObj')
      console.log(this.productsObj);

      //PAGINATION 
      this.pagination();

      //  console.log( 'this.productsObj');
      //  console.log( this.productsObj);


    })

  }


  checkentry(color) {
    for (let i = 0; i < this.colours.length; i++) {
      if (color == this.colourFilter[i]) {
        return true;
      }
    }

    return false;
  }

  //PAGINATION 
  //called each time when a productsObj.length value changes 
  pagination() {
    
    console.log('pagination');
    this.pageIndexes = [];
    let numberOfFrames = Math.ceil((this.productsObj.length) / 6);
    let productObjectIndex = 0;
    let temp = [];
    for (let i = 0; i < numberOfFrames; i++) {
      for (let j = 0; j < 6; j++ , productObjectIndex++) {
        if (this.productsObj[productObjectIndex])
          temp[j] = this.productsObj[productObjectIndex];

      }
      this.pageIndexes[i] = i;
      this.productAllFrames[i] = temp;
      temp = [];
      // intialize the first frame to 1 index
      this.frameInDisplay = this.productAllFrames[0];
    }



  }

  navigateTonextFrame(index) {


    console.log('@navigateTonextFrame ');
    console.log(index);
    this.frameInDisplay = this.productAllFrames[index];

  }







}
