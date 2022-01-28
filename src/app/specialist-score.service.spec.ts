import { TestBed } from '@angular/core/testing';

import { SpecialistScoreService } from './specialist-score.service';

describe('SpecialistScoreService', () => {
  let service: SpecialistScoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecialistScoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
