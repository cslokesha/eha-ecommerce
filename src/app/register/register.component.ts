import { Component, OnInit } from '@angular/core';
import { RegisterServiceService } from '../register.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


 registerInfo =  {
    customerName: "",
    email : "",
    password : 0
  }
  
  constructor(private regService : RegisterServiceService) { }

  ngOnInit() {
  }

  register(frm){
    console.log(frm.controls.email.value);

    this.registerInfo.customerName =  frm.controls.username.value;
    this.registerInfo.email = frm.controls.email.value;
    this.registerInfo.password = frm.controls.password.value;

    console.log(this.registerInfo);
    
    this.regService.register(this.registerInfo).subscribe(
      (data) => {
        console.log(data);
      }
    )
  }
}
