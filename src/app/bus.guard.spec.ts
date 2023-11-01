import { TestBed } from '@angular/core/testing';

import { BusGuard } from './bus.guard';

describe('BusGuard', () => {
  let guard: BusGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BusGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
