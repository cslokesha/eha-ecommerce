import { AddressService } from './../address.service';
import { RegisterServiceService } from './../register.service';
import { Router } from '@angular/router';


import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  public isadd=false;
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
  public addressId
public address;
public addresslist;
  constructor(private router:Router,private registerServiceService:RegisterServiceService,private addressService:AddressService) {
    this.addressService.getaddress().subscribe((data1)=>{
      let res:any=data1;
      let response:any=res.data;
       let r:any=response[0].addressId
       console.log(r)
      this.addresslist=response;
     
    })
   }
   addressadd(){
this.isadd=true
   }
   chooseadd(data){
  this.addressId=data
 
   }

add(){
  console.log(this.addressId)
 sessionStorage.setItem('addressId',this.addressId)
 this.router.navigate(['/checkout'])
}

  ngOnInit() {
  }

  remove(data){
this.addressService.removeaddress(data).subscribe((data1)=>{
  console.log(data)
  let removeaddress=data1;
  if(removeaddress=="SUCCESS"){
    this.addressService.getaddress().subscribe((data)=>{
      console.log(data)
    })
  }
})
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
    this.addressService.addaddress(this.addressinfo).subscribe(
      (data) => {
      console.log(data);
     this.address=data
      if(this.address.status== "SUCCESS")  
      {
        this.addressService.getaddress().subscribe((data1)=>{
          let res:any=data1;
          let response:any=res.data;
           let r:any=response[0].addressId
           console.log(r)
          this.addresslist=response;
          this.isadd=false;
          
        })
       
      }
else{
  alert("please enter proper data")
}
     


      }
    )
  }


}

