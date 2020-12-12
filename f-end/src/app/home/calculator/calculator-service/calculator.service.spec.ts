import { TestBed, inject } from '@angular/core/testing';
import { FormControl } from '@angular/forms';

import { CalculatorService } from './calculator.service';

let mockControl: FormControl;
let service: CalculatorService;
let mockArr: string[];

describe('CalculatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalculatorService]
    });

    mockControl = new FormControl();
    service = TestBed.inject(CalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('метод clearCalcDisplay()', () => {
    it('должен очистить "value" переданной ей "FormControl"', () => {
      mockControl.setValue('test');
      service.clearCalcDisplay(mockControl);
      expect(mockControl.value).toBe('');
    });
  });

  describe('метод calculate()', () => {
    it('должен вызвать метод "parseValue" c "mockControl"', () => {
      spyOn(service, 'parseValue');
      spyOn(service, 'calculateSum');
      service.calculate(mockControl);
      expect(service.parseValue).toHaveBeenCalledWith(mockControl);
    });

    it('должен вызвать метод "calculateSum" и присвоить значение в "mockControl.value"', () => {
      spyOn(service, 'parseValue').and.returnValues(['test']);
      spyOn(service, 'calculateSum').and.returnValues('test2');
      service.calculate(mockControl);
      expect(service.calculateSum).toHaveBeenCalledWith(['test']);
      expect(mockControl.value).toEqual('test2');
    });

  });

  describe('метод parseValue()', () => {
    it('должен распарсить строку в массив с цифрами и математическими знаками', () => {
      mockControl.setValue('25+12');
      const value = service.parseValue(mockControl);
      expect(value).toEqual(['25', '+', '12']);
    });
  });

  describe('метод calcAction()', () => {
    it('должен вызвать метод "markAsDirty" у "mockControl"', () => {
      const btn = document.createElement('button');
      btn.onclick = () => { service.calcAction(mockControl); };
      btn.click();
      expect(mockControl.dirty).toBeTrue();
    });

    it('должен получить "textContent" кнопки и добавить его к имеющемуся "mockControl.value"', () => {
      mockControl.setValue('1');
      const btn = document.createElement('button');
      btn.textContent = '+1';
      btn.onclick = () => { service.calcAction(mockControl); };
      btn.click();
      expect(mockControl.value).toEqual('1+1');
    });

    it('должен вызвать метод "clearCalcDisplay" с аргументом "mockControl"', () => {
      spyOn(service, 'clearCalcDisplay');
      const btn = document.createElement('button');
      btn.textContent = 'C';
      btn.onclick = () => { service.calcAction(mockControl); };
      btn.click();
      expect(service.clearCalcDisplay).toHaveBeenCalledWith(mockControl);
    });

    it('должен вызвать метод "calculate" с аргументом "mockControl"', () => {
      spyOn(service, 'calculate');
      mockControl.setValue('1');
      const btn = document.createElement('button');
      btn.textContent = '=';
      btn.onclick = () => { service.calcAction(mockControl); };
      btn.click();
      expect(service.calculate).toHaveBeenCalledWith(mockControl);
    });
  });

  describe('метод calculateSum()', () => {
    it('должен решить пример переданный в виду "string[]" и вернуть решение в виде "string"', () => {
      mockArr = ['2', '+', '2', '*', '2', '-', '2', '/', '2'];
      const value = service.calculateSum(mockArr);
      expect(value).toBe((2 + 2 * 2 - 2 / 2).toString());
    });
  });

});
