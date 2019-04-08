import { Component, OnInit } from '@angular/core';
import { GetCatagorysService } from '../../get-catagorys.service';
import { Observable } from 'rxjs';


// I import Location so that I can query the current path
import { Location } from '@angular/common';
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
   categorynameobj:string;
  private isLoggedIn = true;
  loggedOut = true;
  public noOfItemsInCart = 1 ;
  public noOfProductsinCart : any = 0;



  constructor(private communicationService : CommunicationService, private getCatagoryName: GetCatagorysService, location: Location,private router: Router ) { 
    // router.events.subscribe(data => console.log(data));


  }

  ngOnInit() {
    // cart count implimentation 

    this.checkcart();
    this.communicationService.subscribeForMessages().subscribe(data=>{
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

      let res:any = resObj;
      let response = JSON.parse(res._body);
      // console.log('-------@@------ response')
      // console.dir(response);

      this.categorynameobj = response.data;
     // let response = JSON.parse(resObj._body);


     
    });


  }

  


    checkcart(){

      if (sessionStorage.getItem('DB') != null){
        let arrOfObj = JSON.parse(sessionStorage.getItem('DB'));
        this.noOfProductsinCart = arrOfObj.length;
      }

    }

  
}
