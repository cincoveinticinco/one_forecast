import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputControl } from './input-control';
import { ControlContainer, FormBuilder, FormGroupDirective } from '@angular/forms';
import { IInputControl } from './input-control.interface';
import { IControl } from '../../../../interfaces/control.interface';

describe('InputControl', () => {
  let component: InputControl;
  let fixture: ComponentFixture<InputControl>;
  let formBuilder = new FormBuilder();
  const control: IInputControl = {
      classes: 'md:col-6 sm:col-12',
      disabled: false,
      help_text: 'document',
      id: 'document_type2',
      label: 'Document type',
      type: 'text',
      value: null,
      validators: [
          {
              validator_type: 'required',
          }
      ],
  }

  beforeEach(async () => {
    const form = formBuilder.group({});
    const controlContainerMock: FormGroupDirective = new FormGroupDirective([], []);
    controlContainerMock.form = form;
    await TestBed.configureTestingModule({
      imports: [InputControl],
      providers: [
        {
          provide: ControlContainer, useValue: controlContainerMock
        },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputControl);
    component = fixture.componentInstance;
    component.load(control as IControl);
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
