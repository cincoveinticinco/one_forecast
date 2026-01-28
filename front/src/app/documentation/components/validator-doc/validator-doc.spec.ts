import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatorDoc } from './validator-doc';

describe('ValidatorDoc', () => {
  let component: ValidatorDoc;
  let fixture: ComponentFixture<ValidatorDoc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidatorDoc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidatorDoc);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
