import { Component } from '@angular/core';
import { ControlBlockComponentBase } from '../../../../lib/control-block-component.base';
import { IControlComponent } from '../../../../interfaces/control-component.interface';
import { ITextareControl } from './textarea-control.interface';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { FormService } from '../../../../services/form/form.service';
import { IControl } from '../../../../interfaces/control.interface';
import { Label } from '../../partials/label/label';
import { ErrorControl } from '../../partials/error-control/error-control';
import { TextareaModule } from 'primeng/textarea';
import { LabelBehaviorDirective } from '../../../../../../directives/label-behavior.directive';

@Component({
  selector: 'app-textarea-control',
  imports: [ReactiveFormsModule, Label, ErrorControl, TextareaModule, LabelBehaviorDirective],
  templateUrl: './textarea-control.html',
  styleUrl: './textarea-control.scss',
})
export class TextareaControl extends ControlBlockComponentBase implements IControlComponent {

  declare control: ITextareControl;

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

