
// import { RegisterService} from '../register.service';
// import { Component, OnInit } from '@angular/core';
// import {FormGroup,FormBuilder,Validators, FormControl} from '@angular/forms'
// import {Subject} from 'rxjs'
// import {debounceTime} from 'rxjs/operators'
// import { ActivatedRoute }  from '@angular/router'
// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent implements OnInit {
//   private _success = new Subject<string>();
//   staticAlertClosed = false;
//   successMessage: string;
//   form = new FormGroup({
//     firstName:new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z]*$")]),
//     phone:new FormControl('',[Validators.required,Validators.maxLength(10),Validators.pattern("^[0-9]*$")]),
//     email:new FormControl('',[Validators.required,Validators.email]),
//     password:new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])
//   })
//   forms = new FormGroup({
     
//     email:new FormControl('',[Validators.required,Validators.email]),
//     password:new FormControl('',[Validators.required,
//                                 Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])
      

// })
  

//   constructor(private registerServiceService:RegisterService) { }
//   validation=function(data){
//     console.log(data)
//     this.registerServiceService.addCustomer(data)
    
    
//   }
  
//   ngOnInit():void {
//     setTimeout(() => this.staticAlertClosed = true, 20000);

//     this._success.subscribe((message) => this.successMessage = message);
//     this._success.pipe(
//       debounceTime(50000)
//     ).subscribe(() => this.successMessage = null);
//   }

  

//     onSubmit(data){
//       console.log(`register form data ${ data }` );
//       this.validation(data);
//     }


    
  
  
// }





import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { SignUpInfo } from '../auth/signup-info';
import{Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService,private router:Router) { }

  ngOnInit() { }

  onSubmit() {
    console.log(this.form);

    this.signupInfo = new SignUpInfo(
      this.form.name,
      this.form.phone ,
      this.form.email,
      this.form.password);
      

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.router.navigate(['/login'])
        this.isSignUpFailed = false;
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
