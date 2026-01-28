import { Component, ViewChild } from '@angular/core';
import { ControlBlockComponentBase } from '../../../../lib/control-block-component.base';
import { IControlComponent } from '../../../../interfaces/control-component.interface';
import { IActionControl } from './action-control.interface';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { FormService } from '../../../../services/form/form.service';
import { IControl } from '../../../../interfaces/control.interface';
import { ErrorControl } from '../../partials/error-control/error-control';
import { Label } from '../../partials/label/label';
import { LabelBehaviorDirective } from '../../../../../../directives/label-behavior.directive';
import { Button } from 'primeng/button';
import { Select } from 'primeng/select';
import { ACTIONS_LAYOUT } from './config/actions_layout';
import { IArrayGroup } from '../array-control/array-control.interface';
import { ArrayControl } from '../array-control/array-control';
import { ControlBlock } from '../control-block/control-block';

@Component({
  selector: 'app-action-control',
  imports: [ReactiveFormsModule, ErrorControl, Label, LabelBehaviorDirective, Button, Select, ControlBlock, ArrayControl],
  templateUrl: './action-control.html',
  styleUrl: './action-control.scss',
})
export class ActionControl extends ControlBlockComponentBase implements IControlComponent {

  declare control: IActionControl;
  @ViewChild('arrayActions') arrayActions!: ArrayControl

  constructor(
    protected override controlContainer: ControlContainer,
    protected override formService: FormService,
    // protected layoutService: LayoutCoreService
  ) {
    super(controlContainer, formService);
  }

  load(control: IControl): void {
    //temp
    this.add(control);
  }
  
  addAction() {
    let blocks = this.control.children![0].config.blocks;
    this.control.children![0].config.blocks = [...ACTIONS_LAYOUT(this.formContext.value)];
    this.formContext.reset();
    console.log(this.arrayActions)
    this.arrayActions.addGroup();
    this.cdr.detectChanges();
    // const actionLayout = ACTIONS_LAYOUT(this.formContext.value);
    // this.control.children = [...actionLayout];
  }

}
