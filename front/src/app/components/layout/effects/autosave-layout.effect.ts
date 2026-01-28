import { debounceTime, distinctUntilChanged, Subject, takeUntil } from "rxjs";
import { IEffect, IEffectComponent } from "../interfaces/effect.interface";
import { EffectBaseComponet } from "../lib/effect-component.base";
import { AbstractControl } from "@angular/forms";
import { LayoutCoreService } from "../services/layout-core/layout-core.service";
import { inject } from "@angular/core";
import { FormSubmissionService } from "../services/form-submission/form-submission.service";

export class AutosaveLayoutEffect extends EffectBaseComponet implements IEffectComponent {

    constructor(
        public override destroy: Subject<boolean>,
        public override effect: IEffect,
        public override layoutCoreService: LayoutCoreService
    ) {
        super(destroy, effect, layoutCoreService);
    }

    override init(): void {
        if (!this.treeForm) return;
        const autosave = this.effect.params![0] as Function;
        const getResponses = this.effect.params![1] as Function;

        this.treeForm.valueChanges.pipe(
            takeUntil(this.destroy),
            debounceTime(2000),
            distinctUntilChanged()
        ).subscribe(async (value: any[]) => {
            const response: any[] = await getResponses();
            for (const section of Object.values(value)) {
                for (const [field_key, value] of Object.entries(section)) {
                    const field = {field_key, value}
                    if (response.length > 0) {
                        const fieldResponse = response.find(res => res.key === field.field_key);
                        if (fieldResponse?.response === field.value) continue;
                    }
                    await autosave(field, value);
                }
            }
        })
    }

}