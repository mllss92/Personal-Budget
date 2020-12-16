import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { HistoryData } from './../shared/interfaces/history';
import { DateService } from './services/date.service';
import { ToasterService } from './../shared/services/toaster.service';
import { ErrorHandlerService } from './../shared/helpers/error-handler.service';
import { HistoryHttpService } from './services/history-http.service';
import { HistoryComponent } from './history.component';

describe('HistoryComponent', () => {
    let component: HistoryComponent;
    let fixture: ComponentFixture<HistoryComponent>;

    let dateService: DateService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MatSnackBarModule, RouterTestingModule],
            declarations: [HistoryComponent],
            providers: [HistoryHttpService, ErrorHandlerService, ToasterService, DateService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HistoryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        dateService = TestBed.inject(DateService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('метод editYear()', () => {
        it('должен вызвать метод "editYear" у DateService с своим аргументом и вызвать собственный метод "getUserHistory"', () => {
            spyOn(dateService, 'editYear');
            spyOn(component, 'getUserHistory');

            component.editYear(2077);
            expect(dateService.editYear).toHaveBeenCalledWith(2077);
            expect(component.getUserHistory).toHaveBeenCalled();
        });
    });

    describe('метод editMonth()', () => {
        it('должен вызвать метод "editMonth" у DateService саргументом "mockValue.index" и вызвать метод "getUserHistory"', () => {
            const mockValue = { index: 2077 };
            spyOn(dateService, 'editMonth');
            spyOn(component, 'getUserHistory');

            component.editMonth(mockValue as MatTabChangeEvent);
            expect(dateService.editMonth).toHaveBeenCalledWith(mockValue.index);
            expect(component.getUserHistory).toHaveBeenCalled();
        });
    });

    describe('метод getUserHistory()', () => {
        it('должен вызвать метод "getUserHistory" у "HistoryHttpService" и результат присвоить в переменную "history"', () => {
            const mockValue: HistoryData = {
                type: 'test',
                date: new Date(),
                from: 'test',
                to: 'test',
                value: 12
            };
            const httpService = TestBed.inject(HistoryHttpService);
            spyOn(httpService, 'getUserHistory').and.returnValue(of([mockValue]));

            component.getUserHistory();
            expect(httpService.getUserHistory).toHaveBeenCalled();
            expect(component.history).toEqual([mockValue]);
        });

        it(
            'должен вызвать метод "getUserHistory" у "HistoryHttpService" и если ошибка вызвать метод "error" у "ErrorHandlerService"',
            () => {
                const httpService = TestBed.inject(HistoryHttpService);
                const errorHandler = TestBed.inject(ErrorHandlerService);
                spyOn(httpService, 'getUserHistory').and.returnValue(throwError({}));
                spyOn(errorHandler, 'error');

                component.getUserHistory();
                expect(httpService.getUserHistory).toHaveBeenCalled();
                expect(errorHandler.error).toHaveBeenCalled();
            });
    });
});
