import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentinteractionService {
private LoginComponentmessage=new Subject<string>();
loginmessage$=this.LoginComponentmessage.asObservable();
  constructor() { }
  sendMessage(message){
    this.LoginComponentmessage.next(message)
  }
  
}
