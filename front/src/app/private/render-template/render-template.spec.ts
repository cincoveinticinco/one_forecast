import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderTemplate } from './render-template';

describe('RenderTemplate', () => {
  let component: RenderTemplate;
  let fixture: ComponentFixture<RenderTemplate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenderTemplate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenderTemplate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
