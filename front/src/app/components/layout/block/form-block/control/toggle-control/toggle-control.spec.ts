import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleControl } from './toggle-control';

describe('ToggleControl', () => {
  let component: ToggleControl;
  let fixture: ComponentFixture<ToggleControl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleControl]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToggleControl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
