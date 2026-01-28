import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputControlDoc } from './input-control-doc';

describe('InputControlDoc', () => {
  let component: InputControlDoc;
  let fixture: ComponentFixture<InputControlDoc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputControlDoc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputControlDoc);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
