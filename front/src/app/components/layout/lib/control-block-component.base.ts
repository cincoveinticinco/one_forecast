import { ChangeDetectorRef, Component, effect, inject, Input, OnDestroy } from "@angular/core";
import { IControl } from "../interfaces/control.interface";
import { AbstractControl, ControlContainer, FormGroup } from "@angular/forms";
import { Subject } from "rxjs";
import { FormService } from "../services/form/form.service";
import { LayoutStorageService } from "../services/layout-storage/layout-storage.service";
import { isNil } from "lodash";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({ template: '' })
export abstract class ControlBlockComponentBase implements OnDestroy {
    @Input()control!: IControl;

    protected form!: FormGroup;
    protected formContext!: AbstractControl;
    protected isGroup!: boolean;
    protected destroy: Subject<boolean> = new Subject<boolean>();
    protected layoutStorageService = inject(LayoutStorageService)

    protected cdr = inject(ChangeDetectorRef);

    constructor(
        protected controlContainer: ControlContainer,
        protected formService: FormService,
    ) {
        this.layoutStorageService.changedKeyDataSignal$
            .pipe(takeUntilDestroyed())
            .subscribe(({ key, data }) => {
                if (key === this.control.key && !isNil(data.hidden)) {
                    this.control.hidden = data.hidden;
                    this.control.hidden ? this.formContext.disable() : this.formContext.enable();
                    this.cdr.detectChanges();
                }
            });
    }

    ngOnDestroy(): void {
        this.destroy.next(true);
        this.destroy.unsubscribe();
    }

    protected setConfig(control: IControl): void {
        this.control = control;
    }

    add(control: IControl, form_type?: string): void {
        this.setConfig(control);
        this.form = this.controlContainer.control as FormGroup;
        this.formContext = this.formService.addControl(this.form, control, form_type);
        this.isGroup = this.controlContainer.control!.constructor.name == FormGroup.name;
        // to check errors
        // this.markDirty();
    }

    private markDirty() {
        if (!this.control.value) return;
        this.formContext.markAsDirty(); 
        this.formContext.markAsTouched(); 
    }

}