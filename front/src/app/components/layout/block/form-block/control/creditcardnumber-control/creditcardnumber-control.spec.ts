import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditcardnumberControl } from './creditcardnumber-control';
import { ControlContainer, FormBuilder, FormGroupDirective } from '@angular/forms';
import { ICreditcardnumberControl } from './creditcardnumber-control.interface';
import { IControl } from '../../../../interfaces/control.interface';

describe('CreditcardNumberControl', () => {
  let component: CreditcardnumberControl;
  let fixture: ComponentFixture<CreditcardnumberControl>;
  let formBuilder = new FormBuilder();
  const control: ICreditcardnumberControl = {
      classes: 'md:col-6 sm:col-12',
      disabled: false,
      id: 'credit_card_number',
      label: 'Credit card number',
      value: null,
      validators: [
          {
              validator_type: 'required',
          }
      ],
      number_to_show: 4
  }

  beforeEach(async () => {
    const form = formBuilder.group({});
    const controlContainerMock: FormGroupDirective = new FormGroupDirective([], []);
    controlContainerMock.form = form;
    await TestBed.configureTestingModule({
      imports: [CreditcardnumberControl],
      providers: [
        {
          provide: ControlContainer, useValue: controlContainerMock
        },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditcardnumberControl);
    component = fixture.componentInstance;
    component.load(control as IControl);
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
