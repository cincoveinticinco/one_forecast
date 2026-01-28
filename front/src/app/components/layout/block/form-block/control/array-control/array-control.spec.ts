import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrayControl } from './array-control';
import { ControlContainer, FormBuilder, FormGroupDirective } from '@angular/forms';
import { IArrayControl } from './array-control.interface';
import { IControl } from '../../../../interfaces/control.interface';

describe('ArrayControl', () => {
  let component: ArrayControl;
  let fixture: ComponentFixture<ArrayControl>;
  let formBuilder = new FormBuilder();
  const control: IArrayControl = {
      id: 'substitutes_data',
      blocks: [
          {
              block_type: 'input',
              config: {
                  classes: 'md:col-6 sm:col-12',
                  disabled: false,
                  help_text: 'test',
                  id: 'substitute_name',
                  label: 'Substitute name',
                  type: 'text',
                  value: null,
                  validators: [
                      {
                          validator_type: 'required',
                      }
                  ],
              },
          }
      ],
      has_initial: true,
      add_config: {
          show_add: true,
          show_index: true,
          add_text: 'Add',
          limit: 5,
          can_remove_first: false
      } 
  }

  beforeEach(async () => {
    const form = formBuilder.group({});
    const controlContainerMock: FormGroupDirective = new FormGroupDirective([], []);
    controlContainerMock.form = form;
    await TestBed.configureTestingModule({
      imports: [ArrayControl],
      providers: [
        {
          provide: ControlContainer, useValue: controlContainerMock
        },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrayControl);
    component = fixture.componentInstance;
    component.load(control as IControl);
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
