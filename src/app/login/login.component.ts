import { RegisterComponent } from './../register/register.component';
import { RegisterServiceService } from './../register.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private RegisterServiceService:RegisterServiceService) { }

  ngOnInit() {
  }
  loginData = {
    email : "",
    password : ""
  }

login(frm){
  console.log('inside login method')
 
console.log(frm.email)

  this.loginData.email =frm.email;
  this.loginData.password = frm.password;

  console.log(this.loginData);

  this.RegisterServiceService.logeedin(this.loginData).subscribe(
    (data)=>{
        console.log('## response')
        console.log(data);
    }
  );
}
}
