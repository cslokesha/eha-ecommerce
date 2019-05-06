import { ActivatedRoute } from '@angular/router';
import { PaypalService } from './../paypal.service';
import { AddressService } from './../address.service';
import { HttpClient } from '@angular/common/http';
import { OrderService } from './../order.service';
import { Component, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
declare var $;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
public products;
public data1="https://mail.";
public data2="google.com/mail/u/0/#inbox";
public data=this.data1+this.data2
public addresslist;
public orderlist
public orderdetails
public invidualproduct;
private addressId
 public isorder=false
 public allorders;

public paypal="https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-2N083841R40784239"
  constructor( private order:OrderService,private http:HttpClient, private route: ActivatedRoute,private address:AddressService,private pay:PaypalService) {
this.address.getaddress().subscribe((data1)=>{
  let res:any=data1;
  let response:any=res.data;
   let r:any=response[0].addressId
   console.log(r)
  console.log(response)

})
   }

  ngOnInit() {
    $('.checkout-info-collapsebox').css('display', 'none');
	$('.checkout-info-login-trigger, .checkout-info-coupon-trigger').on('click', function(e){
		e.preventDefault();
		$(this).parent('.checkout-info').next('.checkout-info-collapsebox').slideToggle();
  });
  
 
    this.address.getaddressById().subscribe((data1)=>{
      let res:any=data1;
      
    })
       
  }
  obj={
    "addressId": "",
    "email": "",
    "paymentMode": "CashOnDelivery",
  
  }


  add(frm){
    console.log(frm)
    let logindata =  sessionStorage.getItem('logincustomer');
    let addressid=sessionStorage.getItem('addressid')
    let user=JSON.parse(logindata)
    this.obj.email=user.email;
    this.obj.addressId=addressid
    console.log(`##login data ${user.email}`)
    this.order.placeorder(this.obj).subscribe(
      (data) => {
       this.orderlist=data;
       /////order generation///////
       if(this.orderlist.status== "SUCCESS"){
this.address.getorders().subscribe((data)=>{
this.orderdetails=data;
console.log(data)
let response=this.orderdetails.data
let response1=response[0].orderId;
///get all orders/////////
if(this.orderdetails.status=="SUCCESS"){
  this.address.getone(response1).subscribe((data)=>{
    this.invidualproduct=data;
    this.allorders=this.invidualproduct.data
    ///get indivisual orders/////
    if(this.invidualproduct.status=="SUCCESS"){
     this.isorder=true
    }
    
  })
}


console.log(response1)
})
       }
      }
    )
  }
 
  payment(){
   alert("hai")
    this.pay.paypal().subscribe((data1)=>{
      console.log(data1)
    })
  }
}