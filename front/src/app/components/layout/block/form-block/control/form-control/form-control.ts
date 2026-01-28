import { Component, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IControl } from '../../../../interfaces/control.interface';
import { IFormControl } from './form-control.interface';
import { FormService } from '../../../../services/form/form.service';
import { ControlBlockComponentBase } from '../../../../lib/control-block-component.base';
import { ControlBlock } from '../control-block/control-block';

@Component({
  selector: 'app-form-control',
  imports: [ReactiveFormsModule, ControlBlock],
  templateUrl: './form-control.html',
  styleUrl: './form-control.scss',
})
export class FormControlComponent extends ControlBlockComponentBase implements OnInit {

  declare config: IFormControl;
  declare formContext: FormGroup;

  constructor(
    protected override controlContainer: ControlContainer,
    protected override formService: FormService,
    // protected layoutService: LayoutService
  ) {
    super(controlContainer, formService)
  }

  ngOnInit(): void {
    this.load(this.control)
  }

  load(control: IControl): void {
    this.form = this.controlContainer.control as FormGroup;
    this.add(control);
  }

}
