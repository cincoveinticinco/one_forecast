import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleBlockTypeDoc } from './title-block-type-doc';

describe('TitleBlockType', () => {
  let component: TitleBlockTypeDoc;
  let fixture: ComponentFixture<TitleBlockTypeDoc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleBlockTypeDoc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitleBlockTypeDoc);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
