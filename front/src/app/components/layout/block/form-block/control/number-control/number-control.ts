import { Component } from '@angular/core';
import { ControlBlockComponentBase } from '../../../../lib/control-block-component.base';
import { IControlComponent } from '../../../../interfaces/control-component.interface';
import { INumberControl } from './number-control.interface';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { FormService } from '../../../../services/form/form.service';
import { IControl } from '../../../../interfaces/control.interface';
import { Label } from '../../partials/label/label';
import { ErrorControl } from '../../partials/error-control/error-control';
import { InputNumberModule } from 'primeng/inputnumber';
import { LabelBehaviorDirective } from '../../../../../../directives/label-behavior.directive';


@Component({
  selector: 'app-number-control',
  imports: [ReactiveFormsModule, Label, ErrorControl, InputNumberModule, LabelBehaviorDirective],
  templateUrl: './number-control.html',
  styleUrl: './number-control.scss',
})
export class NumberControl extends ControlBlockComponentBase implements IControlComponent {

  declare control: INumberControl;

  constructor(
    protected override controlContainer: ControlContainer,
    protected override formService: FormService,
  ) {
    super(controlContainer, formService);
  }

  load(control: IControl): void {
    this.add(control);
  }

}
