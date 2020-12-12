import { TestBed } from '@angular/core/testing';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { ToasterService } from './toaster.service';

describe('ToasterService', () => {
  let service: ToasterService;
  let toaster: MatSnackBar;

  const matSnackBarStub = {
    open: jasmine.createSpy('open')
  };
  const mockMessage = 'Mock message';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [
        ToasterService,
        { provide: MatSnackBar, useValue: matSnackBarStub }
      ]
    });

    service = TestBed.inject(ToasterService);
    toaster = TestBed.inject(MatSnackBar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('метод success()', () => {
    it('должен создать параметр "panelClass" у объекта "config" и присвоить ему значение "success"', () => {
      service.success(mockMessage);
      expect(service.config.panelClass).toEqual('success');
    });

    it('должен вызвать метод "open" у "MatSnackBar" с аргументами ("mockMessage", "Success!", "service.config")', () => {
      service.success(mockMessage);
      expect(toaster.open).toHaveBeenCalledWith(mockMessage, 'Success!', service.config);
    });
  });

  describe('метод error()', () => {
    it('должен создать параметр "panelClass" у объекта "config" и присвоить ему значение "error"', () => {
      service.error(mockMessage);
      expect(service.config.panelClass).toEqual('error');
    });

    it('должен вызвать метод "open" у "MatSnackBar" с аргументами ("mockMessage", "Failed!", "service.config")', () => {
      service.error(mockMessage);
      expect(toaster.open).toHaveBeenCalledWith(mockMessage, 'Failed!', service.config);
    });
  });
});
