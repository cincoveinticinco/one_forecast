import { TestBed } from '@angular/core/testing';

import { TableCoreService } from './table-core.service';

describe('TableCoreService', () => {
  let service: TableCoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableCoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
