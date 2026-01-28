import { Component, inject, Input, OnDestroy } from "@angular/core";
import { IBlock } from "../interfaces/block.interface";
import { Subject } from "rxjs";
import { ControlContainer, FormGroup } from "@angular/forms";
import { FormService } from "../services/form/form.service";
import { IControl } from "../interfaces/control.interface";
import { LayoutCoreService } from "../services/layout-core/layout-core.service";

@Component({template: ''})
export abstract class BlockComponentBase<TConfig> implements OnDestroy {
    block!: IBlock;
    config!: TConfig;
    parentForm!: FormGroup;
    form!: FormGroup;
    destroy: Subject<boolean> = new Subject<boolean>();

    protected controlContainer = inject(ControlContainer);
    protected formService = inject(FormService);
    protected layoutCore = inject(LayoutCoreService);

    constructor() {}

    ngOnDestroy(): void {
        this.destroy.next(true);
        this.destroy.unsubscribe();
    }

    add(block: IBlock): void {
        this.block = block;
        this.config = block.config;
    }


    addChildForm(form_type: string): void {
        this.form = this.formService.addControl(this.parentForm, this.config as IControl, form_type) as FormGroup;
    }

}