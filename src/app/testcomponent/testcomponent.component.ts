import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-testcomponent',
  templateUrl: './testcomponent.component.html',
  styleUrls: ['./testcomponent.component.css']
})
export class TestcomponentComponent implements OnInit {
@Input() message:String;
  message1:string="child component"
  @Output() messageevent=new EventEmitter<string>();
  ngOnInit() {
    
  }
  sendmessage(){
    this.messageevent.emit(this.message1)
  }
}
