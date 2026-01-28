import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleBlock } from './title-block';

describe('TitleBlock', () => {
  let component: TitleBlock;
  let fixture: ComponentFixture<TitleBlock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleBlock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitleBlock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
