import { AfterViewInit, Directive, ElementRef, Input, OnInit } from "@angular/core";
import { IControl } from "../components/layout/interfaces/control.interface";

@Directive({
  selector: '[labelBehavior]'
})
export class LabelBehaviorDirective implements OnInit, AfterViewInit {

  @Input() control!: IControl;
  
  constructor(
    private element: ElementRef
  ) {}
  
  ngOnInit(): void {}
  
  private checkMandatory(): void {
    if (!this.control) return;
    if (!this.control.validators) return;
    const validator = this.control.validators.find(v => v.validator_type === 'required');
    if (!validator) return;
    (this.element.nativeElement as HTMLElement).classList.add('label-mandatory');
  }

  ngAfterViewInit(): void {
    this.checkMandatory();
  }

}