import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[loadFilter]'
})
export class LoadFilterDirective {

  constructor(
    public viewContainerRef: ViewContainerRef
  ) { }

}