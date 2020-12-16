import { ChangedUserData } from './../../shared/interfaces/changed-user-data';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';

import { ProfileInfo } from './../../shared/interfaces/profile-info';
import { SettingsHttpService } from './settings-http.service';
import { of, Observable } from 'rxjs';

describe('SettingsHttpService', () => {
  let service: SettingsHttpService;
  let backend: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SettingsHttpService],
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(SettingsHttpService);
    backend = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    backend.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('метод getSettings()', () => {
    it('должен сделать запрос типа "GET" и вернуть "Observable<ProfileInfo>"', () => {
      const mockData: ProfileInfo = { name: 'name', lastName: 'lastName', email: 'email', photoSrc: 'src' };

      service.getSettings().subscribe(
        res => {
          expect(res).toEqual(mockData);
        }
      );
      const request = backend.expectOne('api/settings/get');
      expect(request.request.method).toEqual('GET');
      request.flush(mockData);
    });
  });

  describe('метод goBack()', () => {
    it('должен вызвать метод "back" у "Location"', () => {
      const location = TestBed.inject(Location);
      spyOn(location, 'back');
      service.goBack();
      expect(location.back).toHaveBeenCalled();
    });
  });

  describe('метод uploadPhoto()', () => {
    it('должен сделать запрос типа "POST" и вернуть "Observable<{ path: "path" }>"', () => {
      const mockData = { path: 'path' };

      service.uploadPhoto(new FormData()).subscribe(
        res => {
          expect(res).toEqual(mockData);
        }
      );
      const request = backend.expectOne('api/settings/upload');
      expect(request.request.method).toEqual('POST');
      request.flush(mockData);
    });
  });

  describe('метод confirmPassword()', () => {
    it('должен сделать запрос типа "POST" и вернуть "Observable<boolean>', () => {
      service.confirmPassword('').subscribe(
        res => {
          expect(res).toBe('test' as unknown as boolean);
        }
      );
      const request = backend.expectOne('api/settings/confirm-password');
      expect(request.request.method).toEqual('POST');
      request.flush('test');
    });
  });

  describe('метод saveChanges()', () => {
    it('должен сделать запрос типа "PATCH" и вернуть "Observable<ProfileInfo>', () => {
      const mockResData: ProfileInfo = { name: 'name', lastName: 'lastName', email: 'email', photoSrc: 'src' };
      service.saveChanges({}).subscribe(
        res => {
          expect(res).toEqual(mockResData);
        }
      );
      const request = backend.expectOne('api/settings/save-changes');
      expect(request.request.method).toEqual('PATCH');
      request.flush(mockResData);
    });
  });
});
