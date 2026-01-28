import { TestBed } from '@angular/core/testing';

import { FormTemplateService } from './form-template.service';

describe('FormTemplate', () => {
  let service: FormTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
