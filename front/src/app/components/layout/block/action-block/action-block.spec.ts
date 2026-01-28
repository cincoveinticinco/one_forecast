import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionBlock } from './action-block';

describe('ActionBlock', () => {
  let component: ActionBlock;
  let fixture: ComponentFixture<ActionBlock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionBlock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionBlock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
