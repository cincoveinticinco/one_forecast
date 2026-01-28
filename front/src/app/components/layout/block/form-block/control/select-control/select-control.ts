import { ChangeDetectionStrategy, Component, effect } from '@angular/core';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { Label } from '../../partials/label/label';
import { ErrorControl } from '../../partials/error-control/error-control';
import { MultiSelectModule } from 'primeng/multiselect';
import { ControlBlockComponentBase } from '../../../../lib/control-block-component.base';
import { IControlComponent } from '../../../../interfaces/control-component.interface';
import { FormService } from '../../../../services/form/form.service';
import { takeUntil } from 'rxjs';
import { IControl } from '../../../../interfaces/control.interface';
import { LayoutStorageService } from '../../../../services/layout-storage/layout-storage.service';
import { ISelectControl } from './select-control.interface';
import { SelectModule } from 'primeng/select';
import { LabelBehaviorDirective } from '../../../../../../directives/label-behavior.directive';
import { Button } from 'primeng/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { JsonPipe } from '@angular/common';
import { isArray } from 'lodash';

@Component({
  selector: 'app-select-control',
  imports: [ReactiveFormsModule, Label, ErrorControl, MultiSelectModule, SelectModule, LabelBehaviorDirective, Button],
  templateUrl: './select-control.html',
  styleUrl: './select-control.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectControl extends ControlBlockComponentBase implements IControlComponent {

  declare control: ISelectControl;

  constructor(
    protected override controlContainer: ControlContainer,
    protected override formService: FormService,
    // protected layoutService: LayoutCoreService
  ) {
    super(controlContainer, formService);
    this.layoutStorageService.changedKeyDataSignal$
      .pipe(takeUntilDestroyed())
      .subscribe(({ key, data }) => {
          if (key === this.control.key) {
            data = isArray(data) ? data : [];
            this.control.options = [...data, ...this.control.options?.filter(option => !option.visible_if)!];
            this.cdr.detectChanges();
          }
      });
  }

  load(control: IControl): void {
      this.add(control);
  }

}
