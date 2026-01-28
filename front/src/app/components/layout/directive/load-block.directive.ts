import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[loadBlock]'
})
export class LoadBlockDirective {

  constructor(
    public viewContainerRef: ViewContainerRef
  ) { }

}