import { TestcomponentComponent } from './../testcomponent/testcomponent.component';
import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-temp',
  templateUrl: './temp.component.html',
  styleUrls: ['./temp.component.css']
})
export class TempComponent implements OnInit {
message1="parentcomponent"
@ViewChild(TestcomponentComponent) test;

  constructor() { }

  ngOnInit() {
  }
 message($event){
   this.message1=$event
 }
 ngAfterViewInit(){
   this.message1=this.test.message1;
 }

}
