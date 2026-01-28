import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlBlock } from './control-block';

describe('ControlBlock', () => {
  let component: ControlBlock;
  let fixture: ComponentFixture<ControlBlock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlBlock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlBlock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
