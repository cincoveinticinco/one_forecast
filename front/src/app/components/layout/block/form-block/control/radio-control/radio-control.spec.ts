import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioControl } from './radio-control';
import { ControlContainer, FormBuilder, FormGroupDirective } from '@angular/forms';
import { IRadioControl } from './radio-control.interface';
import { IControl } from '../../../../interfaces/control.interface';

describe('RadioControl', () => {
  let component: RadioControl;
  let fixture: ComponentFixture<RadioControl>;
  let formBuilder = new FormBuilder();
  const control: IRadioControl = {
      id: 'brands',
      classes: 'md:col-2 sm:col-12',
      label: 'Exclusice country brand',
      options: [
          {
              value: 1,
              name: 'Yes'
          },
          {
              value: 2,
              name: 'No'
          },
      ],
      validators: [
          {
              validator_type: 'required',
          }
      ],
      dependent_value: 1
  }

  beforeEach(async () => {
    const form = formBuilder.group({});
    const controlContainerMock: FormGroupDirective = new FormGroupDirective([], []);
    controlContainerMock.form = form;
    await TestBed.configureTestingModule({
      imports: [RadioControl],
      providers: [
        {
          provide: ControlContainer, useValue: controlContainerMock
        },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioControl);
    component = fixture.componentInstance;
    component.load(control as IControl);
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
