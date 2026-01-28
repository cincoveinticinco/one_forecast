import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlDoc } from './form-control-doc';

describe('FormControlDoc', () => {
  let component: FormControlDoc;
  let fixture: ComponentFixture<FormControlDoc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormControlDoc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormControlDoc);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
