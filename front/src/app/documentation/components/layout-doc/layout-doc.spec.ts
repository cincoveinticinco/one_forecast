import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutDoc } from './layout-doc';

describe('LayoutDoc', () => {
  let component: LayoutDoc;
  let fixture: ComponentFixture<LayoutDoc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutDoc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutDoc);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
