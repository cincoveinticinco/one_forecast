import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBlock } from './form-block';

describe('FormBlock', () => {
  let component: FormBlock;
  let fixture: ComponentFixture<FormBlock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormBlock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormBlock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
