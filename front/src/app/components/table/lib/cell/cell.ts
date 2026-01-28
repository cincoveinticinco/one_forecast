import { CommonModule } from '@angular/common';
import { Component, ComponentFactoryResolver, Inject, Input, Type, ViewChild } from '@angular/core';
import { LoadCellDirective } from '../../directive/load-cell.directive';
import { IColumn } from '../../interfaces/column.interface';
import { CellConfig, ICellComponent } from '../../interfaces/cell-component.interface';
import { CELL_CONFIG_TOKEN } from '../../config/cell.config';

@Component({
  selector: 'app-cell',
  imports: [CommonModule, LoadCellDirective],
  template: '<ng-template loadCell></ng-template>'
})
export class Cell {

  @Input() column!: IColumn;
  @Input() row!: any;

  @ViewChild(LoadCellDirective, {static: true}) loadCell!: LoadCellDirective;

  instance!: ICellComponent;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    @Inject(CELL_CONFIG_TOKEN) private CELL_CONFIG: CellConfig
  ) { }

  ngOnInit(): void {
    this.load();
  }

  private getCellClass(): Type<ICellComponent> {
    const componentClass = this.CELL_CONFIG[this.column.column_type!];
    if (!componentClass) {
      throw {code: 'cell-component-not-found', message: "Cell component class not found"}
    }
    return componentClass;
  }

  private load(): void {
    /* Get cell class */
    const componentClass = this.getCellClass();

    /* Get schema of component to load */
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    
    /* Clear template */
    const viewContainerRef = this.loadCell.viewContainerRef;
    viewContainerRef.clear();

    /* Load component */
    const componentRef = viewContainerRef.createComponent(componentFactory);

    /* Save instance of component */
    this.instance = <ICellComponent>componentRef.instance;
    this.instance.load(this.column, this.row);
  }

}
