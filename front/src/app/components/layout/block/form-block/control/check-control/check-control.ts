import { Component } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { ICheckControl } from './check-control.interface';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { Label } from '../../partials/label/label';
import { ErrorControl } from '../../partials/error-control/error-control';
import { LabelBehaviorDirective } from '../../../../../../directives/label-behavior.directive';
import { ControlBlockComponentBase } from '../../../../lib/control-block-component.base';
import { IControlComponent } from '../../../../interfaces/control-component.interface';
import { FormService } from '../../../../services/form/form.service';
import { IControl } from '../../../../interfaces/control.interface';

@Component({
  selector: 'app-check-control',
  imports: [CheckboxModule, ReactiveFormsModule, Label, ErrorControl, LabelBehaviorDirective],
  templateUrl: './check-control.html',
  styleUrl: './check-control.scss',
})
export class CheckControl extends ControlBlockComponentBase implements IControlComponent {

  declare control: ICheckControl;

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
