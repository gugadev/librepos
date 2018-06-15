import { TestBed, inject } from '@angular/core/testing';

import { EmissionPointService } from './emission-point.service';

describe('EmissionPointService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmissionPointService]
    });
  });

  it('should be created', inject([EmissionPointService], (service: EmissionPointService) => {
    expect(service).toBeTruthy();
  }));
});
