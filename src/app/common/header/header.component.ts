import { Component, OnInit } from '@angular/core';
import { GetCatagorysService } from '../../get-catagorys.service';
import { Observable } from 'rxjs';


// I import Location so that I can query the current path
import { Location } from '@angular/common';
// I also import Router so that I can subscribe to events
import { Router } from '@angular/router';
import { TokenStorageService } from '../../auth/token-storage.service';

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



  constructor( private getCatagoryName: GetCatagorysService, location: Location,private router: Router,private token: TokenStorageService ) { 
    // router.events.subscribe(data => console.log(data));


  }

  ngOnInit() {

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
    this.info = {
      token: this.token.getToken(),
    //   username: this.token.getUsername(),
      
    //   authorities: this.token.getAuthorities()
   };

  }

  
  logout() {
    this.token.signOut();
    window.location.reload();
    this.router.navigate(['/home'])
    }


  
}
