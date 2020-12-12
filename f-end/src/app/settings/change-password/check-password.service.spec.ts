import { TestBed, inject } from '@angular/core/testing';

import { CheckPasswordService } from './check-password.service';

describe('CheckPasswordService', () => {
  let service: CheckPasswordService;
  let input: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckPasswordService]
    });
    service = TestBed.inject(CheckPasswordService);
    input = document.createElement('input');
    input.setAttribute('type', 'text');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
