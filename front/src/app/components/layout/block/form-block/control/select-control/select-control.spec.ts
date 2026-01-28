import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectControl } from './select-control';
import { ISelectControl } from './select-control.interface';
import { ControlContainer, FormBuilder, FormGroupDirective } from '@angular/forms';
import { IControl } from '../../../../interfaces/control.interface';

describe('SelectControl', () => {
  let component: SelectControl;
  let fixture: ComponentFixture<SelectControl>;
  let formBuilder = new FormBuilder();
  const control: ISelectControl = {
      classes: 'md:col-6 sm:col-12',
      id: 'personal_type',
      validators: [
          {
              validator_type: 'required',
          }
      ],
      disabled: false,
      label: 'Provider type',
      options: [
          {
              id: 1,
              name: 'Natural',
          },
          {
              id: 2,
              name: 'Juridica',
          },
      ],
      option_value: 'id',
      option_label: 'name',
      searchable: true,
      multiple: false,
      add_options: true,
      value: null
  }

  beforeEach(async () => {
    const form = formBuilder.group({});
    const controlContainerMock: FormGroupDirective = new FormGroupDirective([], []);
    controlContainerMock.form = form;
    await TestBed.configureTestingModule({
      imports: [SelectControl],
      providers: [
        {
          provide: ControlContainer, useValue: controlContainerMock
        },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectControl);
    component = fixture.componentInstance;
    component.load(control as IControl);
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
