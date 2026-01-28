import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlBlock } from './form-control-block';

describe('FormControlBlock', () => {
  let component: FormControlBlock;
  let fixture: ComponentFixture<FormControlBlock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormControlBlock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormControlBlock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
