import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocInformation } from './doc-information';

describe('DocInformation', () => {
  let component: DocInformation;
  let fixture: ComponentFixture<DocInformation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocInformation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocInformation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
