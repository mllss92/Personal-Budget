import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { DataService } from './../../shared/services/data.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<number>();

  editInput: FormControl;

  constructor(
    public dataservice: DataService
  ) { }

  ngOnInit(): void {
    this.editInput = new FormControl(null, [Validators.required]);
  }

  close(): void {
    this.cancel.emit();
  }

  onSave(): void {
    const value = +this.editInput.value;
    if (value !== undefined || value !== null) {
      this.save.emit(value);
    }
  }

}
