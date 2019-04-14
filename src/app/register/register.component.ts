import { Component, OnInit } from '@angular/core';
import { RegisterServiceService } from '../register.service';
import { Router } from '@angular/router';


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
  
  constructor(private regService : RegisterServiceService,private router:Router) { }

  ngOnInit() {
  }

  register(frm){
  

    this.registerInfo.customerName =  frm.controls.username.value;
    this.registerInfo.email = frm.controls.email.value;
    this.registerInfo.password = frm.controls.password.value;

   
    
    this.regService.register(this.registerInfo).subscribe(
      (data) => {
      let userdata=data;

      if(userdata['status'] == "SUCCESS")  
      {
        alert('user register successfully')
        this.router.navigate(['/login'])

      }
      else
      {     
    alert('this email is already exist')
      }


      }
    )
  }
}
