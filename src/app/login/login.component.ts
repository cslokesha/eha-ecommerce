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
      
        sessionStorage.setItem('logincustomer',JSON.stringify(data))

     let  logindata =  sessionStorage.getItem('logincustomer');
  let array = JSON.parse(logindata);


        if(array.jwt==null){
          this.errorstatus=true;
          alert("invalid username/password")
        }
        else{
       
          this.loginstatus=true;
       this.interction.sendMessage(this.loginstatus);
       alert("user login successfully")
        }
        }
  );
}



}
