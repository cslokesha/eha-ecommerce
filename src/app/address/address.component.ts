import { RegisterServiceService } from './../register.service';
import { Router } from '@angular/router';


import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  addressinfo =  {
    addressline1: "",
    addressline2: "",
    addressline3 : "",
    city:"",
    country:"",
    fullname:"",
    pincode:"",
    state:"",
    town:""
  }

  constructor(private router:Router,private registerServiceService:RegisterServiceService) { }

  ngOnInit() {
  }
  onSubmit(frm){
    console.log(frm.addressline1)
  
    this.addressinfo.addressline1 =  frm.addressline1;
    this.addressinfo.addressline2 = frm.addressline2;
    this.addressinfo.addressline3 = frm.addressline3;
    this.addressinfo.city =  frm.city;
    this.addressinfo.country = frm.country;
    this.addressinfo.fullname = frm.fullname;
    this.addressinfo.pincode =  frm.pincode;
    this.addressinfo.state = frm.state;
    this.addressinfo.town = frm.town;


   
    console.log(this.addressinfo)
    this.registerServiceService.addaddress(this.addressinfo).subscribe(
      (data) => {
      console.log(data);

     


      }
    )
  }


}

