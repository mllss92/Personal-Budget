import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.dialog.html'
})
export class ChangeEmailComponent implements OnInit {

  email: FormControl;

  constructor() { }

  ngOnInit(): void {
    this.email = new FormControl(null, [Validators.required, Validators.email]);
  }

}
