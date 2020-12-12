import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator-service/calculator.service';
import { CalculatorComponent } from './calculator.component';

describe('CalculatorComponent', () => {
    let component: CalculatorComponent;
    let fixture: ComponentFixture<CalculatorComponent>;

    const calcServiceSpy = {
        calcAction: jasmine.createSpy('calcAction')
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CalculatorComponent],
            providers: [
                CalculatorService,
                { provide: CalculatorService, useValue: calcServiceSpy }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CalculatorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('метод onDone()', () => {
        it('должен метод "emit" у done в случае если calcDisplay.value будет числом и тем самым будет вылидным', () => {
            spyOn(component.done, 'emit');
            component.calcDisplay.setValue(123);
            component.onDone();
            expect(component.done.emit).toHaveBeenCalledWith(123);
        });

        it('должен присвоить ошибку "valueError" для "calcDisplay" в случае если "calcDisplay.value" будет не валидным', () => {
            component.calcDisplay.setValue('invalid');
            component.onDone();
            expect(component.calcDisplay.hasError('valueError')).toBeTrue();
        });
    });

    describe('метод calcAction()', () => {
        it('должен вызвать метод "calcAction" у CalculatorService', () => {
            component.calcAction();
            expect(calcServiceSpy.calcAction).toHaveBeenCalledWith(component.calcDisplay);
        });
    });

    describe('метод close()', () => {
        it('должен вызвать метод "emit" у closeCalc', () => {
            spyOn(component.closeCalc, 'emit');
            component.close();
            expect(component.closeCalc.emit).toHaveBeenCalled();
        });
    });

    describe('метод distributeError()', () => {
        it('должен присвоить ошибку "distributeError" для "calcDisplay"', () => {
            component.distributeError();
            expect(component.calcDisplay.hasError('distributeError')).toBeTrue();
        });
    });

    describe('метод spendError()', () => {
        it('должен присвоить ошибку "distributeError" для "calcDisplay"', () => {
            component.spendError();
            expect(component.calcDisplay.hasError('spendError')).toBeTrue();
        });
    });
});
