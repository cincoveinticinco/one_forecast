import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneControl } from './phone-control';
import { ControlContainer, FormBuilder, FormGroupDirective } from '@angular/forms';
import { IPhoneControl } from './phone.interface';
import { IControl } from '../../../../interfaces/control.interface';

describe('PhoneControl', () => {
  let component: PhoneControl;
  let fixture: ComponentFixture<PhoneControl>;
  let formBuilder = new FormBuilder();
  const control: IPhoneControl = {
      classes: 'md:col-6 sm:col-12',
      id: 'description',
      validators: [
          {
              validator_type: 'required',
          }
      ],
      disabled: false,
      label: 'Phone',
      show_countries: true,
      value: null
  }

  beforeEach(async () => {
    const form = formBuilder.group({});
    const controlContainerMock: FormGroupDirective = new FormGroupDirective([], []);
    controlContainerMock.form = form;
    await TestBed.configureTestingModule({
      imports: [PhoneControl],
      providers: [
        {
          provide: ControlContainer, useValue: controlContainerMock
        },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneControl);
    component = fixture.componentInstance;
    component.load(control as IControl);
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
