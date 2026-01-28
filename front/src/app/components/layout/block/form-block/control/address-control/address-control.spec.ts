import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressControl } from './address-control';
import { ControlContainer, FormBuilder, FormGroupDirective } from '@angular/forms';
import { IAddressControl } from './address-control.interface';
import { IControl } from '../../../../interfaces/control.interface';

describe('AddressControl', () => {
  let component: AddressControl;
  let fixture: ComponentFixture<AddressControl>;
  let formBuilder = new FormBuilder();
  const control: IAddressControl = {
      id: 'address',
      classes: 'col-12'
  }

  beforeEach(async () => {
    const form = formBuilder.group({});
    const controlContainerMock: FormGroupDirective = new FormGroupDirective([], []);
    controlContainerMock.form = form;
    await TestBed.configureTestingModule({
      imports: [AddressControl],
      providers: [
        {
          provide: ControlContainer, useValue: controlContainerMock
        },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressControl);
    component = fixture.componentInstance;
    component.load(control as IControl);
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
