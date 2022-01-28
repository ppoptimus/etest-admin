import { TestBed } from '@angular/core/testing';

import { OccupationGroupService } from './occupation-group.service';

describe('OccupationGroupService', () => {
  let service: OccupationGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OccupationGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
