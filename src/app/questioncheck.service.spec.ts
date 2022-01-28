import { TestBed } from '@angular/core/testing';

import { QuestioncheckService } from './questioncheck.service';

describe('QuestioncheckService', () => {
  let service: QuestioncheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestioncheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
