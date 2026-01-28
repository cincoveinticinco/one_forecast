import { Component } from '@angular/core';
import { ControlBlockComponentBase } from '../../../../lib/control-block-component.base';
import { IControlComponent } from '../../../../interfaces/control-component.interface';
import { AbstractControl, ControlContainer, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormService } from '../../../../services/form/form.service';
import { IControl } from '../../../../interfaces/control.interface';
import { IAddressControl } from './address-control.interface';
import { ControlBlock } from '../control-block/control-block';
import { IBlock } from '../../../../interfaces/block.interface';
import { AddressControlConfig } from './address-control.config';

@Component({
  selector: 'app-address-control',
  imports: [ReactiveFormsModule, ControlBlock],
  templateUrl: './address-control.html',
  styleUrl: './address-control.scss',
})
export class AddressControl extends ControlBlockComponentBase implements IControlComponent {

  declare control: IAddressControl;
  declare formContext: FormGroup;
  blocks: IBlock[] = AddressControlConfig;

  constructor(
    protected override controlContainer: ControlContainer,
    protected override formService: FormService,
    // protected layoutService: LayoutCoreService
  ) {
    super(controlContainer, formService);
  }

  load(control: IControl): void {
    this.form = this.controlContainer.control as FormGroup;
    this.add(control, 'group');
  }

}