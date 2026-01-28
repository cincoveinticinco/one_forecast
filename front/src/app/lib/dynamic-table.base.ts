import { Component, inject, Input, signal } from "@angular/core";
import { DynamicDialog } from "./dynamic-dialog.base";
import { IColumn } from "../components/table/interfaces/column.interface";
import { IActionTable } from "../components/table/interfaces/action.interface";
import { IPagination } from "../components/table/interfaces/pagination.interface";
import { TableLazyLoadEvent } from "primeng/table";
import { Router } from "@angular/router";
import { IFilterService } from "../components/table/interfaces/filter-service.interface";

@Component({template: ''})
export abstract class DynamicTableBase extends DynamicDialog {

    @Input() protected id!: number;
    protected columns = signal<IColumn[]>([]);
    protected actions = signal<IActionTable<any>[]>([]);
    protected globalActions = signal<IActionTable<any>[]>([]);
    protected pagination = signal<IPagination>({});
    protected filters = signal<Record<string, any>>({});
    protected filtersOptions = signal<Record<string, any>>({});
    protected router = inject(Router);

    constructor() {
        super();
    }

    protected getPagination(event?: TableLazyLoadEvent) {
        if (!event) return;
        const page = Math.floor((event.first ?? 0) / (event.rows ?? 10)) + 1;
        const limit = event?.rows! || 10;
        this.addFilters({page, limit});
        this.getSort(event);
    }

    protected getFilters(filters: Record<string, any>) {
        this.filters.set(filters);
        this.addFilters({page: 1, limit: 10});
    }

    protected addColumn(newColumn: IColumn) {
        this.columns.update(prevColumns => [...prevColumns, newColumn])
    }

    protected getDinamicallyFilters(): Record<string, IFilterService> {
        if (!this.filtersOptions()['filter_keys']) return {};
        const filters: Record<string, IFilterService> = {};
        for (const [filterkey, value] of Object.entries(this.filters())) {
            if (!this.filtersOptions()['filter_keys'].some((filter: any) => filter.key === filterkey)) {
                filters[filterkey] = { dinamyc: false, value };
                continue;
            }
            filters[filterkey] = { dinamyc: true, value }
        }
        return filters;
    }

    private getSort(event: TableLazyLoadEvent) {
        if (!event.sortOrder || !event.sortField) return;
        const order = {
            order_by: event.sortField,
            order_dir: event.sortOrder > 0 ? 'asc' : 'desc'
        }
        this.addFilters(order);
    }

    private addFilters(values: any) {
        this.filters.update(prevFilters => ({...prevFilters, ...values}));
    }

}