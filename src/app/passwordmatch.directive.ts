






import { Validators, NG_VALIDATORS, AbstractControl } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appPasswordmatch]',
  providers:[{
    provide:NG_VALIDATORS,
    useExisting:PasswordmatchDirective,
    multi:true
  }]
})
export class PasswordmatchDirective implements Validators {
@Input() appPasswordmatch:string
  validate(control:AbstractControl):{[key:string]:any}| null{
const controlCompare= control.parent.get(this.appPasswordmatch);
if(controlCompare && controlCompare.value!==control.value){
  return{'notEqual':true};

}
return null;

  }

  constructor() { }

}
