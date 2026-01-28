import { TestBed } from '@angular/core/testing';

import { LayoutStorageService } from './layout-storage.service';

describe('LayoutStorage', () => {
  let service: LayoutStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LayoutStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
