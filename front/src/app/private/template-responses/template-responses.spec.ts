import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateResponses } from './template-responses';

describe('TemplateResponses', () => {
  let component: TemplateResponses;
  let fixture: ComponentFixture<TemplateResponses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateResponses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateResponses);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
