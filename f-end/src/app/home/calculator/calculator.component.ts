import { FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { DataService } from './../../shared/services/data.service';
import { CalculatorService } from './calculator-service/calculator.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  @Output() closeCalc = new EventEmitter<void>();
  @Output() done = new EventEmitter<number>();


  calcDisplay: FormControl;

  test = 'test';

  constructor(
    public calcService: CalculatorService,
    public dataService: DataService
  ) { }

  ngOnInit(): void {
    this.calcDisplay = new FormControl('', [Validators.required]);
    setTimeout(() => {
      const input = document.querySelector('.mat-form-field-underline') as HTMLDivElement;
      input.style.display = 'none';
    }, 10);
    document.querySelector('.calculator').addEventListener('keydown', () => {
      const eventCode = (event as KeyboardEvent).code;
      if (eventCode === 'NumpadEnter') {
        this.calcService.calculate(this.calcDisplay);
      }
    });
  }

  calcBtnsOnly(): void {
    const inputEvent = event as InputEvent;
    if (inputEvent.data !== undefined && inputEvent.data !== null) {
      if (!this.calcService.buttons.includes(inputEvent.data) && inputEvent.data !== '=') {
        this.calcDisplay.setValue(this.calcDisplay.value.slice(0, this.calcDisplay.value.length - 1));
      }
    }
  }

  calcAction(): void {
    this.calcService.calcAction(this.calcDisplay);
  }

  close(): void {
    this.closeCalc.emit();
  }

  onDone(): void {
    const value = this.calcDisplay.value;
    if (isNaN(value) || value === 0 || !value || value < 0) {
      this.calcDisplay.setErrors({ valueError: true });
    } else {
      this.done.emit(+this.calcDisplay.value);
    }
  }

  distributeError(): void {
    this.calcDisplay.setErrors({ distributeError: true });
  }


}
