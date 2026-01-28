import { Component, OnInit } from '@angular/core';
import { ControlBlockComponentBase } from '../../../../lib/control-block-component.base';
import { IControlComponent } from '../../../../interfaces/control-component.interface';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { FormService } from '../../../../services/form/form.service';
import { IControl } from '../../../../interfaces/control.interface';
import { IDateControl } from './date-control.interface';
import { Label } from '../../partials/label/label';
import { ErrorControl } from '../../partials/error-control/error-control';
import { DatePickerModule } from 'primeng/datepicker';
import { LabelBehaviorDirective } from '../../../../../../directives/label-behavior.directive';

@Component({
  selector: 'app-date-control',
  imports: [ReactiveFormsModule, Label, ErrorControl, DatePickerModule, LabelBehaviorDirective],
  templateUrl: './date-control.html',
  styleUrl: './date-control.scss',
})
export class DateControl extends ControlBlockComponentBase implements IControlComponent, OnInit {

  declare control: IDateControl;
  min_date: Date | undefined;
  max_date: Date | undefined;

  constructor(
    protected override controlContainer: ControlContainer,
    protected override formService: FormService,
    // protected layoutService: LayoutCoreService
  ) {
    super(controlContainer, formService);
  }

  ngOnInit(): void {
    this.setDates();
  }

  setDates() {
    if (this.control.min_date) {
      this.min_date = new Date(this.control.min_date);
    }
    if (this.control.max_date) {
      this.max_date = new Date(this.control.max_date);
    }
  }

  load(control: IControl): void {
    this.add(control);
  }

}
