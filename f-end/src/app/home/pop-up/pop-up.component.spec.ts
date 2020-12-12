import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { Category } from './../../shared/interfaces/category';
import { DataService } from './../../shared/services/data.service';
import { ToasterService } from './../../shared/services/toaster.service';
import { ErrorHandlerService } from './../../shared/helpers/error-handler.service';
import { HomeHttpService } from './../services/http-service/home-http.service';
import { PopupService } from './pop-up-service/popup.service';
import { PopUpComponent } from './pop-up.component';
import { CalculatorComponent } from '../calculator/calculator.component';

describe('PopUpComponent', () => {
    let component: PopUpComponent;
    let fixture: ComponentFixture<PopUpComponent>;
    let homeHttp: HomeHttpService;
    let popupService: PopupService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MatSnackBarModule, RouterTestingModule],
            declarations: [PopUpComponent, CalculatorComponent],
            providers: [
                PopupService,
                HomeHttpService,
                ErrorHandlerService,
                ToasterService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PopUpComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        homeHttp = TestBed.inject(HomeHttpService);
        popupService = TestBed.inject(PopupService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('метод incomeAddDone()', () => {
        it('должен вызвать метод "addIncome" у "HomeHttpService" с нужным аргументом', () => {
            spyOn(homeHttp, 'addIncome');
            component.incomeAddDone(12);
            expect(homeHttp.addIncome).toHaveBeenCalledWith(12);
        });

        it('должен вызвать метод "incomeAddToggle" у "popupService"', () => {
            spyOn(popupService, 'incomeAddToggle');
            component.incomeAddDone(12);
            expect(popupService.incomeAddToggle).toHaveBeenCalled();
        });
    });

    describe('метод distributeDone()', () => {
        it('должен вызвать метод "distributeError" у "CalculatorComponent" если аргумент больше чем "dataService.authorizedUser.avalibleToDistribute"', () => {
            const calcComp = jasmine.createSpyObj('CalculatorComponent', ['distributeError']);
            component.calcComponent = calcComp;
            const dataService = TestBed.inject(DataService);
            dataService.authorizedUser.avalibleToDistribute = 1;
            component.distributeDone(2);
            expect(component.calcComponent.distributeError).toHaveBeenCalled();
        });

        it('должен вызвать метод "distributeIncome" у "HomeHttpService"', () => {
            spyOn(homeHttp, 'distributeIncome');
            const dataService = TestBed.inject(DataService);
            dataService.authorizedUser.avalibleToDistribute = 2;
            component.distributeDone(1);
            expect(homeHttp.distributeIncome).toHaveBeenCalledWith(1);
        });

        it('должен вызвать метод "closeSavingPopup" у "PopupService"', () => {
            spyOn(popupService, 'closeSavingPopup');
            const dataService = TestBed.inject(DataService);
            dataService.authorizedUser.avalibleToDistribute = 2;
            component.distributeDone(1);
            expect(popupService.closeSavingPopup).toHaveBeenCalled();
        });
    });

    describe('метод createNewSpend()', () => {
        it('должен вызвать метод "createNewSpend" у "HomeHttpService" c аргументом переданым в этот метод', () => {
            const value: Category = {
                name: 'name',
                image: 'image'
            };
            spyOn(homeHttp, 'createNewSpend');
            component.createNewSpend(value);
            expect(homeHttp.createNewSpend).toHaveBeenCalledWith(value);
        });

        it('должен вызвать метод "spendCreateToogle" у "PopupService"', () => {
            const value: Category = {
                name: 'name',
                image: 'image'
            };
            spyOn(popupService, 'spendCreateToogle');
            component.createNewSpend(value);
            expect(popupService.spendCreateToogle).toHaveBeenCalled();
        });
    });

    describe('метод createNewSaving()', () => {
        it('должен вызвать метод "createNewSaving" у "HomeHttpService" c аргументом переданым в этот метод', () => {
            const value: Category = {
                name: 'name',
                image: 'image'
            };
            spyOn(homeHttp, 'createNewSaving');
            component.createNewSaving(value);
            expect(homeHttp.createNewSaving).toHaveBeenCalledWith(value);
        });

        it('должен вызвать метод "savingCreateToogle" у "PopupService"', () => {
            const value: Category = {
                name: 'name',
                image: 'image'
            };
            spyOn(popupService, 'savingCreateToogle');
            component.createNewSaving(value);
            expect(popupService.savingCreateToogle).toHaveBeenCalled();
        });
    });

    describe('метод addSpend()', () => {
        it('должен вызвать метод "spendError" у "CalculatorComponent" если аргумент больше чем "dataService.savingCardValue"', () => {
            const calcComp = jasmine.createSpyObj('CalculatorComponent', ['spendError']);
            component.calcComponent = calcComp;
            const dataService = TestBed.inject(DataService);
            dataService.savingCardValue = 1;
            component.addSpend(2);
            expect(component.calcComponent.spendError).toHaveBeenCalled();
        });

        it('должен вызвать метод "addSpend" у "HomeHttpService" и метод "closeSpendPopup" у "PopupService" если аргумент меньше "dataService.savingCardValue"', () => {
            spyOn(homeHttp, 'addSpend');
            spyOn(popupService, 'closeSpendPopup');
            const dataService = TestBed.inject(DataService);
            dataService.savingCardValue = 2;
            component.addSpend(1);
            expect(homeHttp.addSpend).toHaveBeenCalledWith(1);
            expect(popupService.closeSpendPopup).toHaveBeenCalled();
        });
    });

    describe('метод incomeEdit()', () => {
        it('должен вызвать метод c аргументом "editIncome" у "HomeHttpService" и метод "incomeEditToggle" у "PopupService"', () => {
            spyOn(homeHttp, 'editIncome');
            spyOn(popupService, 'incomeEditToggle');
            component.incomeEdit(1);
            expect(homeHttp.editIncome).toHaveBeenCalledWith(1);
            expect(popupService.incomeEditToggle).toHaveBeenCalled();
        });
    });
});
