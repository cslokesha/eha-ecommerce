import { OrderService } from './../order.service';
import { Component, OnInit } from '@angular/core';
declare var $;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
public products;
  constructor( private order:OrderService) {

   }

  ngOnInit() {
    $('.checkout-info-collapsebox').css('display', 'none');
	$('.checkout-info-login-trigger, .checkout-info-coupon-trigger').on('click', function(e){
		e.preventDefault();
		$(this).parent('.checkout-info').next('.checkout-info-collapsebox').slideToggle();
  });
  this.order.getallorders().subscribe((data)=>{
    console.log(data)
  })
  }
  


  add(frm){
  localStorage.setItem('frm1',JSON.stringify(frm));
    this.order.placeorder(frm).subscribe(
      (data) => {
      let userdata=data;
      console.log(userdata)


      }
    )
  }

}
