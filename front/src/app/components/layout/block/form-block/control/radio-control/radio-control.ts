import { Component, DestroyRef, inject } from '@angular/core';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ControlBlockComponentBase } from '../../../../lib/control-block-component.base';
import { IControlComponent } from '../../../../interfaces/control-component.interface';
import { IRadioControl } from './radio-control.interface';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { FormService } from '../../../../services/form/form.service';
import { IControl } from '../../../../interfaces/control.interface';
import { Label } from '../../partials/label/label';
import { ErrorControl } from '../../partials/error-control/error-control';
import { LabelBehaviorDirective } from '../../../../../../directives/label-behavior.directive';

@Component({
  selector: 'app-radio-control',
  imports: [ RadioButtonModule, ReactiveFormsModule, Label, ErrorControl, LabelBehaviorDirective ],
  templateUrl: './radio-control.html',
  styleUrl: './radio-control.scss',
})
export class RadioControl extends ControlBlockComponentBase implements IControlComponent {

  declare control: IRadioControl;
  private readonly destroyRef = inject(DestroyRef);

  protected hasDependent = false;

  constructor(
    protected override controlContainer: ControlContainer,
    protected override formService: FormService,
    // protected layoutService: LayoutCoreService
  ) {
    super(controlContainer, formService);
  }

  load(control: IControl): void {
    this.add(control);
    // this.listenChanges();
  }


}
