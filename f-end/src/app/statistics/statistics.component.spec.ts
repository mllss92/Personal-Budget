import { of, throwError, zip, BehaviorSubject } from 'rxjs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import * as moment from 'moment';

import { AmountStatisticsData } from './../shared/interfaces/amount-statistics-data';
import { SavingStatisticsData } from './../shared/interfaces/saving-statistics-data';
import { SpendStatisticsData } from './../shared/interfaces/spend-statistics-data';
import { ToasterService } from './../shared/services/toaster.service';
import { ErrorHandlerService } from './../shared/helpers/error-handler.service';
import { StatisticsHttpService } from './services/statistics-http.service';
import { StatisticsComponent } from './statistics.component';
import { DateService } from './services/date.service';

describe('StatisticsComponent', () => {
    let component: StatisticsComponent;
    let fixture: ComponentFixture<StatisticsComponent>;

    let httpService: StatisticsHttpService;

    const dateServiceStub = {
        editMonth: jasmine.createSpy('editMonth'),
        date$: new BehaviorSubject(moment())
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MatSnackBarModule, RouterTestingModule],
            declarations: [StatisticsComponent],
            providers: [
                StatisticsHttpService,
                ErrorHandlerService,
                ToasterService,
                { provide: DateService, useValue: dateServiceStub }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StatisticsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        httpService = TestBed.inject(StatisticsHttpService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('метод "createStatisticSubscription()"', () => {
        it('должен вызвать методы "getSpendsStatistics", "getSavingsStatistics", "getAmountStatistics" у "StatisticsHttpService"', () => {
            spyOn(httpService, 'getSpendsStatistics');
            spyOn(httpService, 'getSavingsStatistics');
            spyOn(httpService, 'getAmountStatistics');

            component.createStatisticSubscription();

            expect(httpService.getSpendsStatistics).toHaveBeenCalled();
            expect(httpService.getSavingsStatistics).toHaveBeenCalled();
            expect(httpService.getAmountStatistics).toHaveBeenCalled();
        });

        it('должен присвоить результаты методов "getSpendsStatistics", "getSavingsStatistics", "getAmountStatistics" у "StatisticsHttpService" в соответствующие переменные', () => {
            const spendStatistics: SpendStatisticsData = {
                spends: [],
                expenses: 1
            };
            const savingsStatistics: SavingStatisticsData = {
                savings: [],
                income: 1
            };
            const amountStatistics: AmountStatisticsData[] = [{
                name: 'test',
                series: []
            }];
            spyOn(httpService, 'getSpendsStatistics').and.returnValue(of(spendStatistics));
            spyOn(httpService, 'getSavingsStatistics').and.returnValue(of(savingsStatistics));
            spyOn(httpService, 'getAmountStatistics').and.returnValue(of(amountStatistics));

            component.createStatisticSubscription();

            zip(
                httpService.getSpendsStatistics(),
                httpService.getSavingsStatistics(),
                httpService.getAmountStatistics(),
            ).subscribe(
                res => {
                    expect(component.spendsStatistics).toEqual(spendStatistics);
                    expect(component.savingsStatistics).toEqual(savingsStatistics);
                    expect(component.amountStatistics).toEqual(amountStatistics);
                }
            );
        });

        it('в случае ошибки должен вызвать метож "error" у "ErrorHandlerService" с аргументом самой ошибки', () => {
            const errorHandler = TestBed.inject(ErrorHandlerService);
            spyOn(httpService, 'getSpendsStatistics').and.returnValue(throwError('Error'));
            spyOn(errorHandler, 'error');

            component.createStatisticSubscription();

            zip(
                httpService.getSpendsStatistics(),
                httpService.getSavingsStatistics(),
                httpService.getAmountStatistics(),
            ).subscribe(
                res => { },
                err => {
                    expect(errorHandler.error).toHaveBeenCalledWith(err);
                }
            );
        });

        it('должен при вызове присвоить переменной "loading" значение "true", a по завершению подписки значение "false"', () => {
            component.createStatisticSubscription();
            expect(component.loading).toBeTruthy();

            zip(
                httpService.getSpendsStatistics(),
                httpService.getSavingsStatistics(),
                httpService.getAmountStatistics(),
            ).subscribe(
                res => { },
                err => { },
                () => {
                    expect(component.loading).toBeFalsy();
                }
            );
        });
    });

    describe('метод "editMonth()"', () => {
        it(
            'должен вызвать метод "editMonth" у "DateService" с переданным аргументом и собственный метод "createStatisticSubscription"',
            () => {
                const dateService = TestBed.inject(DateService);
                spyOn(component, 'createStatisticSubscription');

                component.editMonth(1);
                expect(dateService.editMonth).toHaveBeenCalledWith(1);
                expect(component.createStatisticSubscription).toHaveBeenCalledWith(dateService.date$.value.format('MM.yyyy'));
            });
    });
});
