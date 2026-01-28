import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteControl } from './autocomplete-control';
import { ControlContainer, FormBuilder, FormGroupDirective } from '@angular/forms';
import { IAutocompleteControl } from './autocomplete-control.interface';
import { IControl } from '../../../../interfaces/control.interface';

describe('AutocompleteControl', () => {
  let component: AutocompleteControl;
  let fixture: ComponentFixture<AutocompleteControl>;
  let formBuilder = new FormBuilder();
  const control: IAutocompleteControl = {
      classes: 'md:col-6 sm:col-12',
      id: 'scene',
      validators: [
          {
              validator_type: 'required',
          }
      ],
      disabled: false,
      label: 'Scene',
      options: [
          {
              id: 1,
              name: 'Cast',
          },
          {
              id: 2,
              name: 'Figurantes',
          },
          {
              id: 3,
              name: 'Stunts',
          },
      ],
      option_value: 'id',
      option_label: 'name',
      value: null
  }

  beforeEach(async () => {
    const form = formBuilder.group({});
    const controlContainerMock: FormGroupDirective = new FormGroupDirective([], []);
    controlContainerMock.form = form;
    await TestBed.configureTestingModule({
      imports: [AutocompleteControl],
      providers: [
        {
          provide: ControlContainer, useValue: controlContainerMock
        },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteControl);
    component = fixture.componentInstance;
    component.load(control as IControl);
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
