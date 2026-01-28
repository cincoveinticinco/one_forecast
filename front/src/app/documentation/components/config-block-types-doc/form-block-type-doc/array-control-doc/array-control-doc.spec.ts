import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrayControlDoc } from './array-control-doc';

describe('ArrayControlDoc', () => {
  let component: ArrayControlDoc;
  let fixture: ComponentFixture<ArrayControlDoc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrayControlDoc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrayControlDoc);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
