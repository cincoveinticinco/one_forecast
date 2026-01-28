import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDisabledControl } from './select-disabled-control';
import { IControl } from '../../../../interfaces/control.interface';
import { ControlContainer, FormBuilder, FormGroupDirective } from '@angular/forms';
import { ISelectDisabledControl } from './select-disabled-control.interface';

describe('SelectDisabledControl', () => {
  let component: SelectDisabledControl;
  let fixture: ComponentFixture<SelectDisabledControl>;
  let formBuilder = new FormBuilder();
  const control: ISelectDisabledControl = {
      id: 'main_ciiu_code',
      classes: 'md:col-12 sm:col-12',
      label: 'Ciiu code (main)',
      options: [
          {
              id: 1,
              name: '1',
              description: 'Test 1'
          },
          {
              id: 2,
              name: '2',
              description: 'Test 2'
          },
      ],
      option_description: 'description' 
  }

  beforeEach(async () => {
    const form = formBuilder.group({});
    const controlContainerMock: FormGroupDirective = new FormGroupDirective([], []);
    controlContainerMock.form = form;
    await TestBed.configureTestingModule({
      imports: [SelectDisabledControl],
      providers: [
        {
          provide: ControlContainer, useValue: controlContainerMock
        },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDisabledControl);
    component = fixture.componentInstance;
    component.load(control as IControl);
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
