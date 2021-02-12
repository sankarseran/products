import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[keyPrevent]',
})
export class KeyPreventDirective {
  constructor(private el: ElementRef) {}

  alphabetsRex = new RegExp(/[a-zA-Z]|\s/);
  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    
    const e = <KeyboardEvent>event;
    // console.log('KeyboardEvent => ', e.key, ' => ', this.alphabetsRex.test(e.key));
    if(!this.alphabetsRex.test(e.key)) {
        e.preventDefault();
    }
  }
}
