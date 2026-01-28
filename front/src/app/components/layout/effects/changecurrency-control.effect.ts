import { Subject, takeUntil } from "rxjs";
import { IEffect, IEffectComponent } from "../interfaces/effect.interface";
import { EffectBaseComponet } from "../lib/effect-component.base";
import { AbstractControl } from "@angular/forms";
import { LayoutCoreService } from "../services/layout-core/layout-core.service";

const COUNTRIES: Record<number, { currency: string; locale: string }> = {
    1: { currency: 'COP', locale: 'en-CO' },
    2: { currency: 'MXN', locale: 'en-MX' },
    3: { currency: 'USD', locale: 'en-US' },
};

export class ChangeCurrencyControlEffect extends EffectBaseComponet implements IEffectComponent {

    constructor(
        public override destroy: Subject<boolean>,
        public override effect: IEffect,
        public override layoutCoreService: LayoutCoreService,
        public override control?: AbstractControl,
    ) {
        super(destroy, effect, layoutCoreService, control);
    }

    override init(): void {
        if (!this.effect.target_path) return;
        const targetPath: string = this.effect.target_path;

        const targetControl: AbstractControl = this.treeForm.get(targetPath) as AbstractControl;
        targetControl.valueChanges.pipe(takeUntil(this.destroy))
            .subscribe((value: any) => {
                this.layoutStorageService.setKeyData({key: this.effect.key_control!, data: COUNTRIES[value.id]});
            })
    }

}