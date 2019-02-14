import { TestBed, inject } from '@angular/core/testing';

import { GetProductsService } from './get-products.service';

describe('GetProductsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetProductsService]
    });
  });

  it('should be created', inject([GetProductsService], (service: GetProductsService) => {
    expect(service).toBeTruthy();
  }));
});
