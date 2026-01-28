import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileControl } from './file-control';
import { ControlContainer, FormBuilder, FormGroupDirective } from '@angular/forms';
import { IFileControl } from './file-control.interface';
import { IControl } from '../../../../interfaces/control.interface';

describe('FileControl', () => {
  let component: FileControl;
  let fixture: ComponentFixture<FileControl>;
  let formBuilder = new FormBuilder();
  const control: IFileControl = {
      classes: 'md:col-12 sm:col-12',
      disabled: false,
      help_text: 'test',
      id: 'files',
      label: 'Files',
      validators: [
          {
              validator_type: 'required',
          }
      ],
      extensions_allowed: '.pdf',
      multiple: true,
      url: 'https://www.primefaces.org/cdn/api/upload.php'
  }

  beforeEach(async () => {
    const form = formBuilder.group({});
    const controlContainerMock: FormGroupDirective = new FormGroupDirective([], []);
    controlContainerMock.form = form;
    await TestBed.configureTestingModule({
      imports: [FileControl],
      providers: [
        {
          provide: ControlContainer, useValue: controlContainerMock
        },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileControl);
    component = fixture.componentInstance;
    component.load(control as IControl);
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
