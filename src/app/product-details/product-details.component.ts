import { Component, OnInit } from '@angular/core';
import { GetProductsService } from '../get-products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommunicationService } from '../communication-service/communicate-between-service.service'




@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productObj;
  productimg;
  price;
  private productID;


  constructor(private productservice: GetProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private communicationService: CommunicationService) { }

  ngOnInit() {
    this.getProductIdFromRouteURL();
    this.productObj = this.getProductsForCatagoryId(this.productID);
    // console.log(this.productObj)
  }

  getProductIdFromRouteURL() {
    this.productID = this.route.snapshot.paramMap.get('id');
    // console.log('#pid');
    // console.dir(this.productID);
    // console.dir( typeof this.productID);
  }

  getProductsForCatagoryId(catagoryId) {
    this.productservice.getProductsByProductId(catagoryId).subscribe(resObj => {
      // console.log('#resObj');
      // console.log(resObj);
      let res: any = resObj;
      let response = JSON.parse(res._body);
      // console.log('-------@@------ response')
      // console.dir(response);
      this.productObj = response.data;
      console.log('this.productsObj');
      console.log(this.productObj);
      this.productimg = this.productObj.mainImageUrl;
      this.price = this.productObj.price;
    })
  }

  //add to cart 
  addToCart() {
  
    // IF DB is empty
    if (sessionStorage.getItem('DB') == null) {
      let empArr = [];
      empArr.push(this.productObj);
      sessionStorage.setItem('DB', JSON.stringify(empArr));
    }
    //if db has some items
    else {
     
      let arrOfObj = JSON.parse(sessionStorage.getItem('DB'));
      let status = this.checkProdInList(arrOfObj, this.productObj);
      if(status == false){
        arrOfObj.push(this.productObj);
        sessionStorage.setItem('DB', JSON.stringify(arrOfObj));
      } 
    }
    let catagoryID = this.getOpctionlRoute();
    this.router.navigate(['/cart', {catagoryIDtocart: catagoryID}])
  }

  ngOnDestroy() {
    // console.log('##### ngOnDestroy app component');
    // localStorage.setItem('PRODUCTS', JSON.stringify(PRODUCTS));
  }

  // return true if the product is found in the list 
  checkProdInList(list, product) {
    for (let index = 0; index < list.length; index++) {
        if(list[index].productId == product.productId){
          return true;
        } 
    }
    return false;
  }

  getOpctionlRoute(){
   let catagoryid =  this.route.snapshot.paramMap.get('catagoryID');
    console.log(`@@ snapshot ${ typeof catagoryid}`)
    return catagoryid;
  }



}
