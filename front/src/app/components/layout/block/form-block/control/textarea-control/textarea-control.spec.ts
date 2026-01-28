import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaControl } from './textarea-control';
import { ControlContainer, FormBuilder, FormGroupDirective } from '@angular/forms';
import { IControl } from '../../../../interfaces/control.interface';
import { ITextareControl } from './textarea-control.interface';

describe('TextareaControl', () => {
  let component: TextareaControl;
  let fixture: ComponentFixture<TextareaControl>;
  let formBuilder = new FormBuilder();
  const control: ITextareControl = {
      classes: 'md:col-6 sm:col-12',
      id: 'description',
      validators: [
          {
              validator_type: 'required',
          }
      ],
      disabled: false,
      label: 'Description',
      rows: 2,
      value: null
  }

  beforeEach(async () => {
    const form = formBuilder.group({});
    const controlContainerMock: FormGroupDirective = new FormGroupDirective([], []);
    controlContainerMock.form = form;
    await TestBed.configureTestingModule({
      imports: [TextareaControl],
      providers: [
        {
          provide: ControlContainer, useValue: controlContainerMock
        },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaControl);
    component = fixture.componentInstance;
    component.load(control as IControl);
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
