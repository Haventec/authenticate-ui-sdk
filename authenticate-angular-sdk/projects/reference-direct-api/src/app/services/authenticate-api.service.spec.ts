import { TestBed } from '@angular/core/testing';

import { AuthenticateApiService } from './authenticate-api.service';

describe('AuthenticateApiService', () => {
  let service: AuthenticateApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticateApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
