import { Component, inject, OnDestroy } from "@angular/core";
import { IFilter } from "../interfaces/filter.interface";
import { AbstractControl, ControlContainer, FormGroup } from "@angular/forms";
import { Subject } from "rxjs";
import { FormService } from "../../layout/services/form/form.service";
import { TableCoreService } from "../services/table-core.service";
import { IControl } from "../../layout/interfaces/control.interface";

@Component({template: ''})
export abstract class FilterComponentBase implements OnDestroy {
    filter!: IFilter;
    parentForm!: FormGroup;
    form!: FormGroup;
    destroy: Subject<boolean> = new Subject<boolean>();
    protected controlContainer = inject(ControlContainer);
    protected formService = inject(FormService);
    protected tableCoreService = inject(TableCoreService);
    protected formContext!: AbstractControl;

    constructor() {}

    ngOnDestroy(): void {
        this.destroy.next(true);
        this.destroy.unsubscribe();
    }

    add(filter: IFilter): void {
        this.filter = filter;
        this.form = this.controlContainer.control as FormGroup;
        this.formContext = this.formService.addControl(this.form, this.filter as IControl);
    }

}