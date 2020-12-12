import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ProfileInfo } from './../shared/interfaces/profile-info';
import { DialogService } from './services/dialog.service';
import { ToasterService } from './../shared/services/toaster.service';
import { ErrorHandlerService } from './../shared/helpers/error-handler.service';
import { SettingsHttpService } from './services/settings-http.service';
import { SettingsComponent } from './settings.component';

describe('SettingsComponent', () => {
    let component: SettingsComponent;
    let fixture: ComponentFixture<SettingsComponent>;

    let httpService: SettingsHttpService;
    let errorHandler: ErrorHandlerService;
    let dialog: DialogService;
    let toaster: ToasterService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MatSnackBarModule, RouterTestingModule, MatDialogModule],
            declarations: [SettingsComponent],
            providers: [SettingsHttpService, ErrorHandlerService, ToasterService, DialogService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        httpService = TestBed.inject(SettingsHttpService);
        errorHandler = TestBed.inject(ErrorHandlerService);
        dialog = TestBed.inject(DialogService);
        toaster = TestBed.inject(ToasterService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('метод getSettings()', () => {
        const value: ProfileInfo = { name: 'name', lastName: 'lastname', email: 'email', photoSrc: 'src' };
        it('должен вызвать метод "getSettings" у "SettingsHttpService"', () => {
            spyOn(httpService, 'getSettings').and.returnValue(of(value));
            component.getSettings();
            expect(httpService.getSettings).toHaveBeenCalled();
        });

        it('должен присвоить результат от "httpService.getSettings()" в объект "profileInfo"', () => {
            spyOn(httpService, 'getSettings').and.returnValue(of(value));
            component.getSettings();
            expect(component.profileInfo).toEqual(value);
        });

        it('должен вызвать метод "error" у "ErrorHandlerService" в случае если на запрос вернется ошибка', () => {
            spyOn(httpService, 'getSettings').and.returnValue(throwError('error'));
            spyOn(errorHandler, 'error');

            component.getSettings();
            httpService.getSettings().subscribe(
                res => { },
                err => {
                    expect(errorHandler.error).toHaveBeenCalledWith(err);
                }
            );
        });
    });

    describe('метод goBack()', () => {
        it('должен вызвать метод "goBack" у "SettingsHttpService"', () => {
            spyOn(httpService, 'goBack');
            component.goBack();
            expect(httpService.goBack).toHaveBeenCalled();
        });
    });

    describe('метод uploadPhoto()', () => {
        it('должен вызвать метод "uploadPhoto" у "SettingsHttpService"', () => {
            spyOn(httpService, 'uploadPhoto').and.returnValue(of({ path: 'test' }));
            const mockData = { files: [new File([], 'any')] };
            component.uploadPhoto(mockData);
            expect(httpService.uploadPhoto).toHaveBeenCalled();
        });

        it('должен присвоить результат от "httpService.uploadPhoto()" в свойство "profileInfo.photoSrc"', () => {
            spyOn(httpService, 'uploadPhoto').and.returnValue(of({ path: 'test' }));
            const mockData = { files: [new File([], 'any')] };
            component.uploadPhoto(mockData);
            expect(component.profileInfo.photoSrc).toBe('test');
        });

        it('должен вызвать метод "error" у "ErrorHandlerService" в случае если на запрос вернется ошибка', () => {
            spyOn(httpService, 'uploadPhoto').and.returnValue(throwError('error'));
            spyOn(errorHandler, 'error');
            const mockData = { files: [new File([], 'any')] };
            component.uploadPhoto(mockData);
            httpService.uploadPhoto(new FormData()).subscribe(
                res => { },
                err => {
                    expect(errorHandler.error).toHaveBeenCalledWith(err);
                }
            );
        });
    });

    describe('метод openConfirmPasswordDialog()', () => {
        it('должен вызвать метод "openConfirmPasswordDialog" у "DialogService" c аргументом значения "mockBtn.dataset.target"', () => {
            spyOn(dialog, 'openConfirmPasswordDialog');
            const mockBtn = document.createElement('button');
            mockBtn.setAttribute('data-target', 'test');
            component.openConfirmPasswordDialog(mockBtn);
            expect(dialog.openConfirmPasswordDialog).toHaveBeenCalledWith('test');
        });
    });

    describe('метод cancelChanges()', () => {
        it('должен "dialog.isChanged" присвоить "false" и все значения "dialog.changesList" присвоить "undefined"', () => {
            dialog.changesList.email = 'test';
            dialog.isChanged = true;
            component.cancelChanges();
            expect(dialog.changesList.email).toBeUndefined();
            expect(dialog.isChanged).toBeFalse();
        });
    });

    describe('метод saveChanges()', () => {
        it('должен удалить ключи в "dialog.changesList" если у них нет значения', () => {
            expect('email' in dialog.changesList).toBeTrue();
            expect('password' in dialog.changesList).toBeTrue();
            expect('name' in dialog.changesList).toBeTrue();
            expect('lastName' in dialog.changesList).toBeTrue();
            component.saveChanges();
            expect('email' in dialog.changesList).toBeFalse();
            expect('password' in dialog.changesList).toBeFalse();
            expect('name' in dialog.changesList).toBeFalse();
            expect('lastName' in dialog.changesList).toBeFalse();
        });

        it('должен вызвать метод "saveChanges" у "SettingsHttpService" если у объекта "dialog.changesList" есть ключ - значение', () => {
            spyOn(httpService, 'saveChanges').and.returnValue(of<any>(''));
            dialog.changesList.email = 'test';
            component.saveChanges();
            expect(httpService.saveChanges).toHaveBeenCalledWith({ email: 'test' });
        });

        it('в случае результата присвоить его в profileInfo, вызвать метод "cancelChanges" и "success" у "ToasterService"', () => {
            const value: ProfileInfo = { email: 'test', name: undefined, lastName: undefined, photoSrc: 'src' };
            spyOn(httpService, 'saveChanges').and.returnValue(of(value));
            spyOn(toaster, 'success');
            spyOn(component, 'cancelChanges');
            dialog.changesList.email = 'aa';
            component.saveChanges();
            expect(component.profileInfo.email).toBe('test');
            expect(component.profileInfo.photoSrc).toBe('src');
            expect(toaster.success).toHaveBeenCalled();
            expect(component.cancelChanges).toHaveBeenCalled();
        });

        it('в случае ошибки должен вызвать метод "error" у "ErrorHandlerService"', () => {
            spyOn(httpService, 'saveChanges').and.returnValue(throwError(''));
            spyOn(errorHandler, 'error');
            dialog.changesList.email = 'aa';
            component.saveChanges();
            expect(errorHandler.error).toHaveBeenCalled();
        });
    });
});
