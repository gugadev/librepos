import { TestBed, inject } from '@angular/core/testing';

import { QueriesService } from './queries.service';

describe('QueriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QueriesService]
    });
  });

  it('should be created', inject([QueriesService], (service: QueriesService) => {
    expect(service).toBeTruthy();
  }));
});
