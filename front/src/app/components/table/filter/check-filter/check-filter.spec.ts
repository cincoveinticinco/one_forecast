import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckFilter } from './check-filter';

describe('CheckFilter', () => {
  let component: CheckFilter;
  let fixture: ComponentFixture<CheckFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
