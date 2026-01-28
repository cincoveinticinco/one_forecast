import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionControl } from './action-control';

describe('ActionControl', () => {
  let component: ActionControl;
  let fixture: ComponentFixture<ActionControl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionControl]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionControl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
