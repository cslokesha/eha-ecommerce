import { ComponentinteractionService } from './../../componentinteraction.service';
import { Component, OnInit, Input } from '@angular/core';
import { GetCatagorysService } from '../../get-catagorys.service';
import { Observable } from 'rxjs';


// I import Location so that I can query the current path
import { Location, LocationStrategy } from '@angular/common';
// I also import Router so that I can subscribe to events
import { Router } from '@angular/router';

import { CommunicationService } from 'src/app/communication-service/communicate-between-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  info: any;
  categorynameobj: string;
  public isLoggedIn = true;
  loggedOut = true;
  public noOfItemsInCart = 1;
  public noOfProductsinCart: any = 0;
  public status: boolean;
  // public isLoggedin = false;



  constructor(private communicationService: CommunicationService,
    private getCatagoryName: GetCatagorysService,
    location: LocationStrategy,
    private interaction: ComponentinteractionService,
    private router: Router,
    private location1 : Location) {
    // router.events.subscribe(data => console.log(data));


  }

  ngOnInit() {
    // cart count implimentation 

    this.checkcart();
    this.communicationService.subscribeForMessages().subscribe(data => {
      console.log(data);
      this.noOfProductsinCart = data;
    })

    this.getCatagoryName.getCategoryNames().subscribe((resObj) => {
      // typeof resobj
      // console.log('-------@@------ typeof resObj')
      // console.dir(typeof resObj);
      // value of resobj
      // console.log('-------@@------ resObj')
      // console.dir(resObj);

      let res: any = resObj;
      let response = JSON.parse(res._body);
      // console.log('-------@@------ response')
      // console.dir(response);

      this.categorynameobj = response.data;
      // let response = JSON.parse(resObj._body);

    });


    this.interaction.loginmessage$.subscribe((message) => {
      console.log(`login status ${message}`)
      if (message) {
        this.isLoggedIn = true;
        // this.router.navigate(['/home'])
        this.location1.back();
      }
    }
    );


   let logindata =  sessionStorage.getItem('logincustomer');
    console.log(`##login data ${logindata}`)
    if(logindata==null)
    this.isLoggedIn = false;



  }
  // add(){
  //   if(Storage.length==0 && sessionStorage.logincustomer==null){

  //     this.loginstatus=true;
  //   }
  //   else{
  //     this.status=true;
  //     this.loginstatus=false

  //   }
  // }

  checkcart() {
    if (sessionStorage.getItem('DB') != null) {
      let arrOfObj = JSON.parse(sessionStorage.getItem('DB'));
      this.noOfProductsinCart = arrOfObj.length;
    }

  }

  Logout() {
    console.log("executing logout");
    sessionStorage.clear();
    this.isLoggedIn = false;

  }


}
