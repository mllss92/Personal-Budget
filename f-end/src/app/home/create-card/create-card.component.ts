import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css']
})
export class CreateCardComponent implements OnInit {

  @Input() title: string;
  @Output() cancel = new EventEmitter<void>();
  @Output() create = new EventEmitter<void>();

  images = ['accessibility_new', 'anchor', 'android', 'build', 'credit_card', 'delete', 'eco', 'explore', 'extension', 'favorite', 'flight_land', 'grade', 'home', 'language', 'pets', 'shopping_basket', 'shopping_cart', 'store', 'stars', 'theaters', 'create', 'mouse', 'security', 'color_lens', 'directions_car', 'handyman', 'local_gas_station', 'local_hotel', 'child_friendly', 'casino', 'fitness_center', 'sports_bar', 'kitchen'];

  createForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.createForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      image: new FormControl('', [Validators.required])
    });
  }

  onSubmit(): void {
    if (this.createForm.valid) {
      this.create.emit(this.createForm.value);
    }
  }

  close(): void {
    this.cancel.emit();
  }
}
