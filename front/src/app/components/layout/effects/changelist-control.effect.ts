import { Subject, takeUntil } from "rxjs";
import { IEffect, IEffectComponent } from "../interfaces/effect.interface";
import { EffectBaseComponet } from "../lib/effect-component.base";
import { AbstractControl } from "@angular/forms";
import { LayoutStorageService } from "../services/layout-storage/layout-storage.service";
import { LayoutCoreService } from "../services/layout-core/layout-core.service";

export class ChangeListControlEffect extends EffectBaseComponet implements IEffectComponent {

    constructor(
        public override destroy: Subject<boolean>,
        public override effect: IEffect,
        public override layoutCoreService: LayoutCoreService,
        public override control?: AbstractControl,
    ) {
        super(destroy, effect, layoutCoreService, control);
    }

    override init(): void {
        const params = this.effect.params;
        if (!this.effect.target_path || !params![0]) return;
        const targetPath: string = this.effect.target_path;
        const valuesPath: any[] = params![0] as any[];
        const targetControl: AbstractControl = this.treeForm.get(targetPath) as AbstractControl;

        const defaultOptions = valuesPath.find(({value: v}) => v === targetControl.value);
        
        if (defaultOptions) {
            this.layoutStorageService.setKeyData({key: this.effect.key_control!, data: defaultOptions.options});
        }

        targetControl.valueChanges.pipe(takeUntil(this.destroy))
            .subscribe((value) => {
                if (!valuesPath.some(({value: v}) => v === value)) return;
                // operator = valuesPath[0].operator
                const options = valuesPath.find(({value: v}) => v === value).options;
                this.layoutStorageService.setKeyData({key: this.effect.key_control!, data: options});
            })
    }

}