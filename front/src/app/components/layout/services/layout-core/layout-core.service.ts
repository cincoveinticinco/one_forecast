import { Inject, Injectable, Injector, signal } from '@angular/core';
import { ILayout } from '../../interfaces/layout.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { IAction } from '../../interfaces/action.interface';
import { EffectConfig } from '../../interfaces/effect.interface';
import { LAYOUT_EFFECT_CONFIG_TOKEN } from '../../config/effect.config';
import { IBlock } from '../../interfaces/block.interface';
import { LayoutStorageService } from '../layout-storage/layout-storage.service';

@Injectable({
  providedIn: 'root',
})
export class LayoutCoreService {

  private layout!: ILayout;
  private form!: FormGroup;
  
  destroy: Subject<boolean> = new Subject<boolean>();
  actionSubject: Subject<IAction>;

  private formFocusedIdSignal = signal<string | undefined>(undefined);
  readonly formFocusedId = this.formFocusedIdSignal.asReadonly();

  constructor(
    private layoutStorageService: LayoutStorageService,
    private fb: FormBuilder,
    @Inject(LAYOUT_EFFECT_CONFIG_TOKEN) private LAYOUT_EFFECT_CONFIG: EffectConfig,
    public injector: Injector
  ) {
    this.actionSubject = new Subject<IAction>();
  }
  
  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  init(): void {
    this.form = this.fb.group({});
  }

  setLayout(layout: ILayout): void {
    this.layout = layout || {};
  }

  getLayout(): ILayout {
    return this.layout
  }

  getBlock(key: string): IBlock {
    const block: IBlock = this.layout.blocks?.find(b => b.key === key)!;
    return block;
  }

  getForm(): FormGroup {
    return this.form;
  }

  getStorage(): LayoutStorageService {
    return this.layoutStorageService;
  }

  emitAction(action: IAction) {
    this.actionSubject.next(action);
  }

  public createEffect(): void {
    if (!this.layout.effects) {
      return;
    }
    for (const effect of this.layout.effects) {
      const effectComponentClass = this.LAYOUT_EFFECT_CONFIG[effect.effect_type!];
      if (!effectComponentClass) {
        console.warn("Layout effect component not found");
      }
      const effectComponent = new effectComponentClass(this.destroy, effect, this);
      effectComponent.execute();
    }
  }

  public setFormFocusedId(id: string) {
    this.formFocusedIdSignal.set(id);
  }
  
}
