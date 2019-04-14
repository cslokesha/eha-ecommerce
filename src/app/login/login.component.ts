import { ComponentinteractionService } from './../componentinteraction.service';
import { HeaderComponent } from './../common/header/header.component';
import { RegisterComponent } from './../register/register.component';
import { RegisterServiceService } from './../register.service';
import { Component, OnInit, Output,EventEmitter} from '@angular/core'; 


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
public loginstatus=false;
public errorstatus=false;

 
  
  constructor(private RegisterServiceService:RegisterServiceService,private interction:ComponentinteractionService) { }

  ngOnInit() {
   
  }
  loginData = {
    email : "",
    password : ""
  }

login(frm){

 
console.log(frm.email)

  this.loginData.email =frm.email;
  this.loginData.password = frm.password;

  console.log(this.loginData);

  this.RegisterServiceService.logeedin(this.loginData).subscribe(
    (data)=>{
      // console.log(data)
        sessionStorage.setItem('logincustomer',JSON.stringify(data));
        let a=sessionStorage.getItem('logincustomer')
        if(sessionStorage.logincustomer==null){
          this.errorstatus=true;
          alert("it is null")
        }
        else{
       
          this.loginstatus=true;
       this.interction.sendMessage(this.loginstatus);
       alert("not null")
        }
        }
  );
}



}
