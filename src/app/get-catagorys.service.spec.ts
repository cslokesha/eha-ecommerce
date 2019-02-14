import { TestBed, inject } from '@angular/core/testing';

import { GetCatagorysService } from './get-catagorys.service';

describe('GetCatagorysService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetCatagorysService]
    });
  });

  it('should be created', inject([GetCatagorysService], (service: GetCatagorysService) => {
    expect(service).toBeTruthy();
  }));
});
