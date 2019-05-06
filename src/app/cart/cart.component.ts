
import { CartItemService } from './../cart-item.service';
import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../communication-service/communicate-between-service.service';
import { Router, ActivatedRoute } from '@angular/router';


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
  products: object
  public productslist;
  productlist = [
    {
      "quantity": 2,
      "sku": "12"
    },
    {
      "quantity": 2,
      "sku": "123"
    }
  ]

  constructor(
    private communicationService: CommunicationService,
    private router: Router,
    private activatedRoute : ActivatedRoute,
    private cartitem: CartItemService) { }

  cartadd() {

    let sessiondata = JSON.parse(sessionStorage.getItem('DB'));
    console.log(sessiondata)
    let seessiondata1 = sessionStorage.getItem('logincustomer')
    if (seessiondata1 == null) {
      this.router.navigate(['/login'])
    }
    else {
      this.router.navigate(['/address'])
      this.cartitem.addcartItem(sessiondata).subscribe((data) => {
        console.log(data)
      })
    }
  }

  ngOnInit() {
    // cart count implimentation 
    this.getSelectedProducts();
  }

  getSelectedProducts() {

    let arrofobj = JSON.parse(sessionStorage.getItem('DB'));
    this.productslist = arrofobj;
    console.log(this.productslist)
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

  continueShopping(){
  debugger
   let catagoryID =  this.activatedRoute.snapshot.paramMap.get('catagoryIDtocart');

  //  product-list/:id'
   this.router.navigate(['/product-list' , catagoryID])
  }


}
