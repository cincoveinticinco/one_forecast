import { Component, OnInit } from '@angular/core';
import { InputMaskModule } from 'primeng/inputmask';
import { SelectModule } from 'primeng/select';
import { IControlComponent } from '../../../../interfaces/control-component.interface';
import { ControlContainer, FormsModule, ReactiveFormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { FormService } from '../../../../services/form/form.service';
import { ControlBlockComponentBase } from '../../../../lib/control-block-component.base';
import { LabelBehaviorDirective } from '../../../../../../directives/label-behavior.directive';
import { ErrorControl } from '../../partials/error-control/error-control';
import { Label } from '../../partials/label/label';
import { IPhoneControl } from './phone.interface';
import { IControl } from '../../../../interfaces/control.interface';
import { NgClass } from '@angular/common';
import { countries } from '../../../../../../shared/data/countries';
import { cloneDeep } from 'lodash';


@Component({
  selector: 'app-phone-control',
  imports: [InputMaskModule, SelectModule, LabelBehaviorDirective, ErrorControl, Label, ɵInternalFormsSharedModule, ReactiveFormsModule, FormsModule, NgClass],
  templateUrl: './phone-control.html',
  styleUrl: './phone-control.scss',
})
export class PhoneControl extends ControlBlockComponentBase implements IControlComponent, OnInit {

  private countries: any[] = countries;
  protected supported_countries: any[] = [];

  protected selectedCountry: any;
  protected defaultMask = '(999) 999-9999';

  declare control: IPhoneControl;
  
  constructor(
    protected override controlContainer: ControlContainer,
    protected override formService: FormService,
  ) {
    super(controlContainer, formService);
  }

  ngOnInit() {
      if (this.control.supported_countries) {
        for (const supported_country of this.control.supported_countries) {
          this.supported_countries.push(this.countries.find(c => c.code === supported_country));
        }
        this.defaultMask = this.supported_countries[0].mask;
      }
      if (this.control?.default) {
        this.selectedCountry = this.countries.find(c => c.code === this.control.default);
      }
  }

  load(control: IControl): void {
    this.add(control);
  }

}
