import { Injectable } from '@angular/core';
import { Observable , Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private subject = new Subject<any>();
  constructor() {
    console.log('constructing CommunicationService ');
   }

   sendMessage(message: string){
      this.subject.next(message);
   }

   subscribeForMessages(): Observable<any> {
     return this.subject.asObservable();
   }

}
