import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[loadCell]'
})
export class LoadCellDirective {

  constructor(
    public viewContainerRef: ViewContainerRef
  ) { }

}