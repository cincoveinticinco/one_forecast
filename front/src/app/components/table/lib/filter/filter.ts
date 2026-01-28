import { Component, ComponentFactoryResolver, Inject, Input, Type, ViewChild } from '@angular/core';
import { LoadFilterDirective } from '../../directive/load-filter.directive';
import { FilterConfig, IFilterComponent } from '../../interfaces/filter-component.interface';
import { FILTER_CONFIG_TOKEN } from '../../config/filter.config';
import { IFilter } from '../../interfaces/filter.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter',
  imports: [CommonModule, LoadFilterDirective],
  template: '<ng-template loadFilter></ng-template>'
})
export class Filter {

  @Input() filter!: IFilter;

  @ViewChild(LoadFilterDirective, {static: true}) loadFilter!: LoadFilterDirective;

  instance!: IFilterComponent;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    @Inject(FILTER_CONFIG_TOKEN) private FILTER_CONFIG: FilterConfig
  ) { }

  ngOnInit(): void {
    this.load();
  }

  private getFilterClass(): Type<IFilterComponent> {
    const componentClass = this.FILTER_CONFIG[this.filter.filter_type!];
    if (!componentClass) {
      throw {code: 'filter-component-not-found', message: "Filter component class not found"}
    }
    return componentClass;
  }

  private load(): void {
    /* Get filter class */
    const componentClass = this.getFilterClass();

    /* Get schema of component to load */
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    
    /* Clear template */
    const viewContainerRef = this.loadFilter.viewContainerRef;
    viewContainerRef.clear();

    /* Load component */
    const componentRef = viewContainerRef.createComponent(componentFactory);

    /* Save instance of component */
    this.instance = <IFilterComponent>componentRef.instance;
    this.instance.load(this.filter);
  }

}
