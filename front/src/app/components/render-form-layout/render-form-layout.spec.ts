import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderFormLayout } from './render-form-layout';

describe('RenderFormLayout', () => {
  let component: RenderFormLayout;
  let fixture: ComponentFixture<RenderFormLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenderFormLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenderFormLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
