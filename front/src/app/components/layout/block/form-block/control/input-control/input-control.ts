import { Component } from '@angular/core';
import { ControlBlockComponentBase } from '../../../../lib/control-block-component.base';
import { IControlComponent, IControlConfig } from '../../../../interfaces/control-component.interface';
import { IControl } from '../../../../interfaces/control.interface';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { FormService } from '../../../../services/form/form.service';
import { InputText } from 'primeng/inputtext';
import { Label } from '../../partials/label/label';
import { ErrorControl } from '../../partials/error-control/error-control';
import { LabelBehaviorDirective } from '../../../../../../directives/label-behavior.directive';
import { IInputControl } from './input-control.interface';

@Component({
  selector: 'app-input-control',
  imports: [InputText, Label, ErrorControl, ReactiveFormsModule, LabelBehaviorDirective],
  templateUrl: './input-control.html',
  styleUrl: './input-control.scss',
})
export class InputControl extends ControlBlockComponentBase implements IControlComponent {

  declare control: IInputControl;

  constructor(
    protected override controlContainer: ControlContainer,
    protected override formService: FormService,
    // protected layoutService: LayoutCoreService
  ) {
    super(controlContainer, formService);
  }

  load(control: IControl): void {
    this.add(control);
  }

}
