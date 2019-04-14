import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../communication-service/communicate-between-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  productaArr = [];
  cartTotal:number = 0 ;
  noOfProductsinCart: any = 5;
  constructor(private communicationService : CommunicationService,private router:Router) {
   
   }
   add(){
     console.log(sessionStorage)
     if(sessionStorage.logincustomer==null){
this.router.navigate(['/login'])
}
else{
  this.router.navigate(['/address'])
}
   }

  ngOnInit() {
    // cart count implimentation 
  
   
  
   this.getSelectedProducts();
   
  }

  getSelectedProducts(){
   
    let arrofobj =JSON.parse(sessionStorage.getItem('DB'));

    this.productaArr = arrofobj;
    this.cartCount(this.productaArr);

    for(let i = 0; i < this.productaArr.length; i++ ){
     this.cartTotal += this.productaArr[i].cp;

     console.log('## carttotal ' + this.cartTotal);
    }


  }

  remove(productId){
  
    for(let i = 0; i < this.productaArr.length; i++ ){
      if(this.productaArr[i].productId == productId ){
        this.productaArr[i].quantity = 1;
        this.cartTotal = this.cartTotal - this.productaArr[i].cp;
        this.productaArr.splice(i,1);
        this.cartCount(this.productaArr);
        sessionStorage.setItem('DB', JSON.stringify( this.productaArr));
      }

    }


  }

  incriment(productId){
    
      console.log()
      for(let i = 0; i < this.productaArr.length; i++ ){
        if(this.productaArr[i].productId == productId && this.productaArr[i].quantity >= 1  ){
          let price = this.productaArr[i].price - ((this.productaArr[i].discount/100) * this.productaArr[i].price);
          this.productaArr[i].cp += price;
          this.productaArr[i].quantity += 1;
          this.cartTotal +=price;
      }
      



  }
}

  decrement(productId){
      console.log()
      console.log()
      for(let i = 0; i < this.productaArr.length; i++ ){
        if(this.productaArr[i].productId == productId && this.productaArr[i].quantity > 1 ){
          let price = this.productaArr[i].price - ((this.productaArr[i].discount/100) * this.productaArr[i].price);
          this.productaArr[i].cp -= price;
          this.productaArr[i].quantity -= 1;
          this.cartTotal -=price;
      }
      



  }
  }

  // use when cartcount changes 
  cartCount(obj){
      this.noOfProductsinCart = obj.length;
      this.communicationService.sendMessage(this.noOfProductsinCart);
  }

  

}
