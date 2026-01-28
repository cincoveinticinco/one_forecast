import { Component, ComponentFactoryResolver, Inject, Input, Type, ViewChild } from '@angular/core';
import { ControlConfig, IControlComponent } from '../../../../interfaces/control-component.interface';
import { IControl } from '../../../../interfaces/control.interface';
import { LoadBlockDirective } from '../../../../directive/load-block.directive';
import { CONTROL_CONFIG_TOKEN } from '../../../../config/control.config';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IBlock } from '../../../../interfaces/block.interface';

@Component({
  selector: 'app-control-block',
  imports: [ReactiveFormsModule, CommonModule, LoadBlockDirective],
  templateUrl: './control-block.html',
  styleUrl: './control-block.scss',
})
export class ControlBlock {

  @Input() control!: IControl;
  @Input() block!: IBlock;
  @ViewChild(LoadBlockDirective, {static: true}) loadBlock!: LoadBlockDirective;

  instance!: IControlComponent;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    @Inject(CONTROL_CONFIG_TOKEN) private CONTROL_CONFIG: { [x: string]: any; }
  ) { }

  ngOnInit(): void {
    this.load();
  }

  private getControlBlockClass(): Type<IControlComponent> {
    const componentClass = this.CONTROL_CONFIG[this.block.field_type!];
    if (!componentClass) {
      throw {code: 'control-component-not-found', message: "Control component class not found"}
    }
    return componentClass;
  }

  private load(): void {
    /* Get control block class */
    const componentClass = this.getControlBlockClass();

    /* Get schema of component to load */
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    
    /* Clear template */
    const viewContainerRef = this.loadBlock.viewContainerRef;
    viewContainerRef.clear();

    /* Load component */
    const componentRef = viewContainerRef.createComponent(componentFactory);

    /* Save instance of component */
    this.instance = <IControlComponent>componentRef.instance;
    this.instance.load(this.block.config);
  }

}
