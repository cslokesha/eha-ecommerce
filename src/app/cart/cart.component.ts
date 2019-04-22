import { products } from './../products';
import { CartItemService } from './../cart-item.service';
import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../communication-service/communicate-between-service.service';
import { Router } from '@angular/router';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  productaArr = [];
  cartTotal: number = 0;
  noOfProductsinCart: any = 5;
  public data;
products:object
  
productlist=[
  {
    "quantity": 2,
    "sku": "12"
  },
  {
    "quantity": 2,
    "sku": "123"
  }
]
  
  constructor(private communicationService: CommunicationService, private router: Router, private cartitem: CartItemService) {
  
  }

  cartadd() {
    // debugger
    let sessiondata = JSON.parse(sessionStorage.getItem('DB'));
    let seessiondata1=sessionStorage.getItem('logincustomer')
    console.log(seessiondata1)
    if(seessiondata1==null){
      this.router.navigate(['/login'])
    }
    else{
    this.cartitem.addcartItem(sessiondata).subscribe((data)=>{
      console.log(data)
      this.router.navigate(['/address'])
    })

    
  }


       
 




  // console.log(sessionStorage.length)
//     if (sessionStorage.logincustomer == null) {
//       this.router.navigate(['/login'])
//       let sessiondata = JSON.parse(sessionStorage.getItem('DB'));
//       for(var i=0;i<sessionStorage.length;i++){
//       this.obj.sku=sessiondata[i].sku;
//       this.obj.quantity=sessiondata[i].quantity;
      
//  }

//     }
    // else {
    //   this.router.navigate(['/address'])
    // }
  }

  ngOnInit() {
    // cart count implimentation 



    this.getSelectedProducts();

  }

  getSelectedProducts() {

    let arrofobj = JSON.parse(sessionStorage.getItem('DB'));

    this.productaArr = arrofobj;
    this.cartCount(this.productaArr);

    for (let i = 0; i < this.productaArr.length; i++) {
      this.cartTotal += this.productaArr[i].cp;

      console.log('## carttotal ' + this.cartTotal);
    }


  }

  remove(productId) {

    for (let i = 0; i < this.productaArr.length; i++) {
      if (this.productaArr[i].productId == productId) {
        this.productaArr[i].quantity = 1;
        this.cartTotal = this.cartTotal - this.productaArr[i].cp;
        this.productaArr.splice(i, 1);
        this.cartCount(this.productaArr);
        sessionStorage.setItem('DB', JSON.stringify(this.productaArr));
      }

    }


  }

  incriment(productId) {
    console.log()
    for (let i = 0; i < this.productaArr.length; i++) {
      if (this.productaArr[i].productId == productId && this.productaArr[i].quantity >= 1) {
        let price = this.productaArr[i].price - ((this.productaArr[i].discount / 100) * this.productaArr[i].price);
        this.productaArr[i].cp += price;
        this.productaArr[i].quantity += 1;
        this.cartTotal += price;
        sessionStorage.setItem('DB', JSON.stringify(this.productaArr));
      }
    }
  }

  decrement(productId) {
    console.log()
    console.log()
    for (let i = 0; i < this.productaArr.length; i++) {
      if (this.productaArr[i].productId == productId && this.productaArr[i].quantity > 1) {
        let price = this.productaArr[i].price - ((this.productaArr[i].discount / 100) * this.productaArr[i].price);
        this.productaArr[i].cp -= price;
        this.productaArr[i].quantity -= 1;
        this.cartTotal -= price;
        sessionStorage.setItem('DB', JSON.stringify(this.productaArr));
      }




    }
  }

  // use when cartcount changes 
  cartCount(obj) {
    this.noOfProductsinCart = obj.length;
    this.communicationService.sendMessage(this.noOfProductsinCart);
  }



}
