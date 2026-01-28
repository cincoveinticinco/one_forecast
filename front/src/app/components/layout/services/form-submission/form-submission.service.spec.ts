import { TestBed } from '@angular/core/testing';

import { FormSubmissionService } from './form-submission.service';

describe('FormSubmission', () => {
  let service: FormSubmissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormSubmissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
