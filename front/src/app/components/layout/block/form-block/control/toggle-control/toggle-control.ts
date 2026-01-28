import { Component } from '@angular/core';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ControlBlockComponentBase } from '../../../../lib/control-block-component.base';
import { IControlComponent } from '../../../../interfaces/control-component.interface';
import { IToggleControl } from './toggle-control.interface';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { FormService } from '../../../../services/form/form.service';
import { IControl } from '../../../../interfaces/control.interface';
import { Label } from '../../partials/label/label';
import { LabelBehaviorDirective } from '../../../../../../directives/label-behavior.directive';
import { ErrorControl } from '../../partials/error-control/error-control';


@Component({
  selector: 'app-toggle-control',
  imports: [ReactiveFormsModule, ToggleSwitchModule, Label, LabelBehaviorDirective, ErrorControl],
  templateUrl: './toggle-control.html',
  styleUrl: './toggle-control.scss',
})
export class ToggleControl extends ControlBlockComponentBase implements IControlComponent {

  declare control: IToggleControl;

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
