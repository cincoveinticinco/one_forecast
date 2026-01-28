import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { IColumn } from "../interfaces/column.interface";
import { IActionTable } from "../interfaces/action.interface";
import { IPagination } from "../interfaces/pagination.interface";
import { TableLazyLoadEvent } from "primeng/table";
import { FormGroup } from "@angular/forms";
import { TableCoreService } from "../services/table-core.service";
import { IFilter } from "../interfaces/filter.interface";
import { SortEvent } from "primeng/api";

@Component({template: ''})
export abstract class TableBase {

    @Input() columns: IColumn[] = [];
    @Input() filtersOptions: Record<string, any[]> = {};
    @Input() searchable = false;
    @Input() pagination!: IPagination;
    @Input() actions: IActionTable<any[]>[] = [];
    @Input() globalActions: IActionTable<any[]>[] = [];
    @Input() values: any[] = [];
    @Input() lazyLoad!: (event: TableLazyLoadEvent) => void;
    @Output() triggerAction: EventEmitter<{key: string, id: number}> = new EventEmitter();
    @Output() triggerFilters: EventEmitter<Record<string, unknown>> = new EventEmitter();

    protected selectedId!: number;
    protected filterForm!: FormGroup;
    protected tableCoreService = inject(TableCoreService)
    protected searchFilter: IFilter = {
        key: 'search',
        filter_type: 'text',
        value: null,
        placeholder: 'Search'
    }
    
    protected getRowActions(row: any): IActionTable<any>[] {
        if (!row._resolvedActions) {
            row._resolvedActions = this.actions
            .filter(action => action.is_visible ? action.is_visible(row) : true)
            .map(action => {
                const key = action.key!;
                return {
                    ...action,
                    visible: true,
                    command: () => {this.triggerAction.emit({ key, id: this.selectedId })}
                };
            });
        }

        return row._resolvedActions;
    }

    protected hasFilters(): boolean {
        return this.columns.some(column => column.filter);
    }

    protected setFiltersOptions() {
        if (this.filtersOptions['filter_keys']) this.setFiltersKeys();
        for (const column of this.columns) {
            if (column.filter && column.filter.filter_type === 'select') {
                if (!this.filtersOptions[column.filter.key]) throw new Error(`${column.filter.key} options must exist inside of filtersOptions`);
                this.filtersOptions[column.filter.key] = this.filtersOptions[column.filter.key].filter(opt => opt);
                column.filter.options = this.filtersOptions[column.filter.key].map(option => ({id: option, name: option}));
            }
        }
    }

    protected setSort() {
        if (!this.filtersOptions['order']) return;
        for (const column of this.columns) {
            column.sortable = this.filtersOptions['order'].find(field => field === column.key) ?? undefined;
        }
    }

    private setFiltersKeys() {
        for (const filter of this.filtersOptions['filter_keys']) {
            const { key, field_type } = filter;
            if (!this.columns.some(col => col.key === key)) {
                console.error(`${key} does not exist in columns`);
                continue;
            }
            const column = this.columns.find(col => col.key === key)!;
            column.filter = {
                filter_type: field_type,
                key: key,
                value: null
            }
        }
    }

}