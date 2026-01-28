import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleBlock } from './multiple-block';

describe('MultipleBlock', () => {
  let component: MultipleBlock;
  let fixture: ComponentFixture<MultipleBlock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultipleBlock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleBlock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
