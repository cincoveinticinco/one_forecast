import { Subject } from "rxjs";
import { IEffect, IEffectComponent } from "../interfaces/effect.interface";
import { EffectBaseComponet } from "../lib/effect-component.base";
import { AbstractControl } from "@angular/forms";
import { LayoutStorageService } from "../services/layout-storage/layout-storage.service";
import { LayoutCoreService } from "../services/layout-core/layout-core.service";

export class DisableControlEffect extends EffectBaseComponet implements IEffectComponent {

    constructor(
        public override destroy: Subject<boolean>,
        public override effect: IEffect,
        public override layoutCoreService: LayoutCoreService,
        public override control?: AbstractControl,
    ) {
        super(destroy, effect, layoutCoreService, control);
    }

    override init(): void {
        // effect functionality...
    }

}