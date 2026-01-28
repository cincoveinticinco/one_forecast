import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateControl } from './date-control';
import { provideZonelessChangeDetection } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroupDirective } from '@angular/forms';
import { IDateControl } from './date-control.interface';
import { IControl } from '../../../../interfaces/control.interface';

describe('DateControl', () => {
  let component: DateControl;
  let fixture: ComponentFixture<DateControl>;
  let formBuilder = new FormBuilder();
  const control: IDateControl = {
      classes: 'md:col-6 sm:col-12',
      id: 'date_start',
      validators: [
          {
              validator_type: 'required',
          }
      ],
      min_date: '12/10/2025',
      disabled: false,
      label: 'Start date',
      value: null
  }

  beforeEach(async () => {
    const form = formBuilder.group({});
    const controlContainerMock: FormGroupDirective = new FormGroupDirective([], []);
    controlContainerMock.form = form;
    await TestBed.configureTestingModule({
      imports: [DateControl],
      providers: [
        {
          provide: ControlContainer, useValue: controlContainerMock
        },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateControl);
    component = fixture.componentInstance;
    component.load(control as IControl);
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
