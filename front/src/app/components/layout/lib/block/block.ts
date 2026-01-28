import { CommonModule } from '@angular/common';
import { Component, ComponentFactoryResolver, Inject, Input, Type, ViewChild } from '@angular/core';
import { IBlock } from '../../interfaces/block.interface';
import { BlockConfig, IBlockComponent } from '../../interfaces/block-component.interface';
import { LoadBlockDirective } from '../../directive/load-block.directive';
import { BLOCK_CONFIG_TOKEN } from '../../config/block.config';

@Component({
  selector: 'app-block',
  imports: [CommonModule, LoadBlockDirective],
  template: '<ng-template loadBlock></ng-template>'
})
export class Block {

  @Input() block!: IBlock;
  control!: any;

  @ViewChild(LoadBlockDirective, {static: true}) loadBlock!: LoadBlockDirective;

  instance!: IBlockComponent;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    @Inject(BLOCK_CONFIG_TOKEN) private BLOCK_CONFIG: BlockConfig
  ) { }

  ngOnInit(): void {
    this.load();
  }

  private getBlockClass(): Type<IBlockComponent> {
    const componentClass = this.BLOCK_CONFIG[this.block.field_type!];
    if (!componentClass) {
      throw {code: 'block-component-not-found', message: "Block component class not found"}
    }
    return componentClass;
  }

  private load(): void {
    /* Get block class */
    const componentClass = this.getBlockClass();

    /* Get schema of component to load */
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    
    /* Clear template */
    const viewContainerRef = this.loadBlock.viewContainerRef;
    viewContainerRef.clear();

    /* Load component */
    const componentRef = viewContainerRef.createComponent(componentFactory);

    /* Save instance of component */
    this.instance = <IBlockComponent>componentRef.instance;
    this.instance.load(this.block);
  }

}
