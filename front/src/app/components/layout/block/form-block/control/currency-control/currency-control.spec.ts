import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyControl } from './currency-control';
import { ControlContainer, FormBuilder, FormGroupDirective } from '@angular/forms';
import { IControl } from '../../../../interfaces/control.interface';
import { ICurrencyControl } from './currency-control.interface';

describe('CurrencyControl', () => {
  let component: CurrencyControl;
  let fixture: ComponentFixture<CurrencyControl>;
  let formBuilder = new FormBuilder();
  const control: ICurrencyControl = {
      classes: 'md:col-6 sm:col-12',
      key: 'value',
      validators: [
          {
              validator_type: 'required',
          }
      ],
      effects: [
          {
              effect_type: 'changecurrency',
              key_control: 'value',
              target_path: 'provider_data.country_currency',
              params: [
                  'provider_data.country_currency',
              ]
          }
      ],
      disabled: false,
      label: 'Value',
      value: null
  }

  beforeEach(async () => {
    const form = formBuilder.group({});
    const controlContainerMock: FormGroupDirective = new FormGroupDirective([], []);
    controlContainerMock.form = form;
    await TestBed.configureTestingModule({
      imports: [CurrencyControl],
      providers: [
        {
          provide: ControlContainer, useValue: controlContainerMock
        },
      ]
    })
    .compileComponents();

  });
  
  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyControl);
    component = fixture.componentInstance;
    component.load(control as IControl);
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
