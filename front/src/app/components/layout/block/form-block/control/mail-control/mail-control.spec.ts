import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailControl } from './mail-control';

describe('MailControl', () => {
  let component: MailControl;
  let fixture: ComponentFixture<MailControl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MailControl]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MailControl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
