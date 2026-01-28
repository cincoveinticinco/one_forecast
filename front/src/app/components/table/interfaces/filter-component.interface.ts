import { Type } from "@angular/core";
import { IFilter } from "./filter.interface";

export interface IFilterComponent {
    filter: IFilter;
    load(filter: IFilter): void;
}

export type FilterConfig = {[key: string]: Type<IFilterComponent>};
