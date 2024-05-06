import { TestBed } from '@angular/core/testing';

import { RankingserviceService } from './rankingservice.service';

describe('RankingserviceService', () => {
  let service: RankingserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RankingserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
