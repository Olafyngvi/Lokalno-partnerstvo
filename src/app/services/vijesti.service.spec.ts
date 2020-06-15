import { TestBed } from '@angular/core/testing';

import { VijestiService } from './vijesti.service';

describe('VijestiService', () => {
  let service: VijestiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VijestiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
