import { ComponentinteractionService } from './componentinteraction.service';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  
      

  constructor(private interaction:ComponentinteractionService){
    console.log('##### constructing app component');
  }

  ngOnInit(){
   }

  

}
