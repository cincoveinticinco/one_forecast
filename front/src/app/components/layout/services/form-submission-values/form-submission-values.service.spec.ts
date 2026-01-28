import { TestBed } from '@angular/core/testing';

import { FormSubmissionValuesService } from './form-submission-values.service';

describe('FormSubmissionValuesService', () => {
  let service: FormSubmissionValuesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormSubmissionValuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
