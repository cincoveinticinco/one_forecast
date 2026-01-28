import { AfterViewInit, Component, DestroyRef, inject } from '@angular/core';
import { ControlBlockComponentBase } from '../../../../lib/control-block-component.base';
import { IControlComponent } from '../../../../interfaces/control-component.interface';
import { ControlContainer, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormService } from '../../../../services/form/form.service';
import { IControl } from '../../../../interfaces/control.interface';
import { ISelectDisabledControl } from './select-disabled-control.interface';
import { IBlock } from '../../../../interfaces/block.interface';
import { SelectDisabledControlConfig } from './select-disabled-control.config';
import { ControlBlock } from '../control-block/control-block';
import { distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-select-disabled-control',
  imports: [ReactiveFormsModule, ControlBlock],
  templateUrl: './select-disabled-control.html',
  styleUrl: './select-disabled-control.scss',
})
export class SelectDisabledControl extends ControlBlockComponentBase implements IControlComponent, AfterViewInit {

  declare control: ISelectDisabledControl;
  declare formContext: FormGroup;
  private readonly destroyRef = inject(DestroyRef);
  blocks: IBlock[] = SelectDisabledControlConfig;

  constructor(
    protected override controlContainer: ControlContainer,
    protected override formService: FormService,
    // protected layoutService: LayoutCoreService
  ) {
    super(controlContainer, formService);
  }

  load(control: IControl): void {
    this.add(control, 'group');
    this.loadSelect();
  }

  ngAfterViewInit(): void {
      this.listenChanges();
  }

  protected loadSelect() {
    this.blocks[0].config.label = this.control.label;
    this.blocks[0].config.options = this.control.options;
    this.blocks[0].config.option_value = this.control.option_value || this.blocks[0].config.option_value;
    this.blocks[0].config.option_label = this.control.option_label || this.blocks[0].config.option_label;
    this.blocks[0].config.searchable = this.control.searchable || this.blocks[0].config.searchable;
    this.blocks[0].config.multiple = this.control.multiple || this.blocks[0].config.multiple;
  }

  protected listenChanges() {
    const parent = this.formContext.get('parent');
    if (!parent) return;
    parent.valueChanges
      .pipe(distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe(value => {
        this.formContext.get('children')?.setValue(value[this.control.option_description], { emitEvent: false })
      });
  }

}