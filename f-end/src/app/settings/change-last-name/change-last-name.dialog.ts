import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ValidatorsService } from './../../shared/validators/validators.service';

@Component({
  selector: 'app-change-last-name',
  templateUrl: './change-last-name.dialog.html'
})
export class ChangeLastNameComponent implements OnInit {

  lastName: FormControl;

  constructor(
    private validators: ValidatorsService
  ) { }

  ngOnInit(): void {
    this.lastName = new FormControl(null, [Validators.required, this.validators.custom(/^[a-zA-Z]{2,}$/, { lastName: '' })]);
  }

}
