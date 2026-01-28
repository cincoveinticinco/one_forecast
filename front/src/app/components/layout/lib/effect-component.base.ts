import { AbstractControl, FormGroup } from "@angular/forms";
import { ILayout } from "../interfaces/layout.interface";
import { lastValueFrom, Subject, timer } from "rxjs";
import { IEffect } from "../interfaces/effect.interface";
import { inject } from "@angular/core";
import { LayoutStorageService } from "../services/layout-storage/layout-storage.service";
import { LayoutCoreService } from "../services/layout-core/layout-core.service";

export class EffectBaseComponet {
    protected treeForm!: FormGroup;
    protected layout!: ILayout;
    protected layoutStorageService: LayoutStorageService;
    // protected layoutCoreService = inject(LayoutCoreService);

    constructor(
        protected destroy: Subject<boolean>,
        protected effect: IEffect,
        protected layoutCoreService: LayoutCoreService,
        protected control?: AbstractControl,
    ) {
        this.layoutStorageService = this.layoutCoreService.getStorage();
        this.treeForm = this.layoutCoreService.getForm();
    }

    init(): void {

    }

    async execute(): Promise<void> {
        try {
            await lastValueFrom(timer(0));
            this.init();
        } catch (error) {
            console.warn(error);
        }
    }

}