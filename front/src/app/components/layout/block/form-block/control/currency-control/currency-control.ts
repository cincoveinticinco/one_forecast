import { Component, effect } from '@angular/core';
import { ControlBlockComponentBase } from '../../../../lib/control-block-component.base';
import { IControlComponent } from '../../../../interfaces/control-component.interface';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { FormService } from '../../../../services/form/form.service';
import { IControl } from '../../../../interfaces/control.interface';
import { Label } from '../../partials/label/label';
import { ErrorControl } from '../../partials/error-control/error-control';
import { ICurrencyControl } from './currency-control.interface';
import { InputNumberModule } from 'primeng/inputnumber';
import { LayoutStorageService } from '../../../../services/layout-storage/layout-storage.service';
import { LabelBehaviorDirective } from '../../../../../../directives/label-behavior.directive';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-currency-control',
  imports: [ReactiveFormsModule, Label, ErrorControl, InputNumberModule, LabelBehaviorDirective],
  templateUrl: './currency-control.html',
  styleUrl: './currency-control.scss',
})
export class CurrencyControl extends ControlBlockComponentBase implements IControlComponent {

  declare control: ICurrencyControl;

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
            this.control.currency = data.currency;
            this.control.locale = data.locale;
          }
      })
  }

  load(control: IControl): void {
    this.add(control);
  }

}
