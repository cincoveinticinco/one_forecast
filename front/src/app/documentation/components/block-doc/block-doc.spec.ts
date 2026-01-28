import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockDoc } from './block-doc';

describe('BlockDoc', () => {
  let component: BlockDoc;
  let fixture: ComponentFixture<BlockDoc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockDoc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockDoc);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
