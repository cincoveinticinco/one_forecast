import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckControl } from './check-control';
import { ControlContainer, FormBuilder, FormGroupDirective } from '@angular/forms';
import { ICheckControl } from './check-control.interface';
import { IControl } from '../components/layout/interfaces/control.interface';

describe('CheckControl', () => {
  let component: CheckControl;
  let fixture: ComponentFixture<CheckControl>;
  let formBuilder = new FormBuilder();
  const control: ICheckControl = {
      id: 'contributor_type',
      classes: 'md:col-6 sm:col-12',
      label: 'Contributor type',
      options: [
          {
              value: 'self-retainer',
              name: 'Self-retainer'
          },
          {
              value: 'major_contributor',
              name: 'Major contributor'
          },
          {
              value: 'exempt',
              name: 'Exempt'
          },
      ],
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
      imports: [CheckControl],
      providers: [
        {
          provide: ControlContainer, useValue: controlContainerMock
        },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckControl);
    component = fixture.componentInstance;
    component.load(control as IControl);
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
