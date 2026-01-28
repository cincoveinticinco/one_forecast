import { Subject, takeUntil } from "rxjs";
import { IEffect, IEffectComponent } from "../interfaces/effect.interface";
import { EffectBaseComponet } from "../lib/effect-component.base";
import { LayoutCoreService } from "../services/layout-core/layout-core.service";
import { AbstractControl } from "@angular/forms";

export class HiddenControlEffect extends EffectBaseComponet implements IEffectComponent {

    constructor(
        public override destroy: Subject<boolean>,
        public override effect: IEffect,
        public override layoutCoreService: LayoutCoreService,
        public override control?: AbstractControl,
    ) {
        super(destroy, effect, layoutCoreService, control);
    }

    override init(): void {
        
        if (!this.effect.target_path || !this.effect.value_path) return;
        const targetPath: string = this.effect.target_path;
        const valuePath: any[] = this.effect.value_path;
        
        const targetControl: AbstractControl = this.treeForm.get(targetPath) as AbstractControl;
        targetControl.valueChanges.pipe(takeUntil(this.destroy))
        .subscribe((value) => {
            console.log(this.effect.key_control)
            console.log(!valuePath.includes(value))
            this.layoutStorageService.setKeyData({key: this.effect.key_control!, data: { hidden: !valuePath.includes(value) }});
        })
    }

}