import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ValidatorsService } from './../../shared/validators/validators.service';

@Component({
  selector: 'app-change-name',
  templateUrl: './change-name.dialog.html'
})
export class ChangeNameComponent implements OnInit {

  name: FormControl;

  constructor(
    private validators: ValidatorsService
  ) { }

  ngOnInit(): void {
    this.name = new FormControl(null, [Validators.required, this.validators.custom(/^[a-zA-Z]{2,}$/, { name: '' })]);
  }

}
