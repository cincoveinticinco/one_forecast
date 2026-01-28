import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareTemplateUrl } from './share-template-url';

describe('ShareTemplateUrl', () => {
  let component: ShareTemplateUrl;
  let fixture: ComponentFixture<ShareTemplateUrl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShareTemplateUrl]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareTemplateUrl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
