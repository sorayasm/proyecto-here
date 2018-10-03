import { TestBed } from '@angular/core/testing';

import { VolService } from './vol.service';

describe('VolService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VolService = TestBed.get(VolService);
    expect(service).toBeTruthy();
  });
});
