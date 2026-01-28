import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBlockTypeDoc } from './form-block-type-doc';

describe('FormBlockType', () => {
  let component: FormBlockTypeDoc;
  let fixture: ComponentFixture<FormBlockTypeDoc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormBlockTypeDoc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormBlockTypeDoc);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
