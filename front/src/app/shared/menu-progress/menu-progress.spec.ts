import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuProgress } from './menu-progress';

describe('MenuProgress', () => {
  let component: MenuProgress;
  let fixture: ComponentFixture<MenuProgress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuProgress]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuProgress);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
