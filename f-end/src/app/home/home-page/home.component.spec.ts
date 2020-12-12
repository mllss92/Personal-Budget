import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DataService } from './../../shared/services/data.service';
import { SharedModuleModule } from './../../shared/shared-module/shared-module.module';
import { ToasterService } from './../../shared/services/toaster.service';
import { PopupService } from './../pop-up/pop-up-service/popup.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let popupService: PopupService;
    let dataService: DataService;

    const popupServiceStub = {
        popupConfig: {
            incomeDistribute: {
                active: false
            },
            saving: {
                active: false
            }
        }
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MatSnackBarModule, RouterTestingModule, SharedModuleModule, BrowserAnimationsModule],
            declarations: [HomeComponent],
            providers: [
                ToasterService,
                { provide: PopupService, userValue: popupServiceStub }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        popupService = TestBed.inject(PopupService);
        dataService = TestBed.inject(DataService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('метод saving()', () => {
        it('должен вызвать метод "savingActive" c созданной "mockButton" в качестве аргумента', () => {
            spyOn(component, 'savingActive');
            const mockButton = document.createElement('button');
            mockButton.id = 'test';
            document.body.append(mockButton);
            component.saving('test', 12, '12');
            expect(component.savingActive).toHaveBeenCalledWith(mockButton);
        });

        it('должен вызвать метод "openSavingPopup у "popupService"', () => {
            spyOn(popupService, 'openSavingPopup');
            popupService.popupConfig.incomeDistribute.active = true;
            component.saving('test', 12, '12');
            expect(popupService.openSavingPopup).toHaveBeenCalled();
        });
    });

    describe('метод savingActive()', () => {
        it('у "mockButton.offsetParent" каким является "body" должен у объекта "classList" вызвать метод "toggle"', () => {
            const mockButton = document.createElement('button');
            spyOn(document.body.classList, 'toggle');
            document.body.append(mockButton);
            component.savingActive(mockButton);
            expect(document.body.classList.toggle).toHaveBeenCalledWith('card-active');
        });

        it('должен вызвать метод "savingActiveToggle у "popupService"', () => {
            spyOn(popupService, 'savingActiveToggle');
            const mockButton = document.createElement('button');
            document.body.append(mockButton);
            component.savingActive(mockButton);
            expect(popupService.savingActiveToggle).toHaveBeenCalled();
        });
    });

    describe('метод onSpend()', () => {
        it('должен вызвать метод "openSpendPopup если "popupService.popupConfig.saving.active" будет в значении "true"', () => {
            spyOn(component, 'openSpendPopup');
            popupService.popupConfig.saving.active = true;
            component.onSpend('id', 12);
            expect(component.openSpendPopup).toHaveBeenCalled();
        });

        it('должен вызвать метод "error" у "ToasterService" если "popupService.popupConfig.saving.active" будет в значении "false"', () => {
            const toaster = TestBed.inject(ToasterService);
            spyOn(toaster, 'error');
            component.onSpend('id', 12);
            expect(toaster.error).toHaveBeenCalled();
        });
    });

    describe('метод openSpendPopup()', () => {
        it('должен найти элемент с классом "card-active" и вызвать метод "classList.toggle" c аргументом "card-active"', () => {
            const mockDiv = document.createElement('div');
            mockDiv.classList.add('card-active');
            document.body.append(mockDiv);
            spyOn(mockDiv.classList, 'toggle');
            component.openSpendPopup();
            expect(mockDiv.classList.toggle).toHaveBeenCalledWith('card-active');
        });

        it('должен вызвать метод "openSpendPopup" у "PopupService"', () => {
            spyOn(popupService, 'openSpendPopup');
            const mockDiv = document.createElement('div');
            mockDiv.classList.add('card-active');
            document.body.append(mockDiv);
            component.openSpendPopup();
            expect(popupService.openSpendPopup).toHaveBeenCalled();
        });
    });
});
