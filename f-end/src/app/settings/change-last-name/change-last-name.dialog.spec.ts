import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeLastNameComponent } from './change-last-name.dialog';
import { ValidatorsService } from './../../shared/validators/validators.service';

describe('AppComponent', () => {
  let component: ChangeLastNameComponent;
  let fixture: ComponentFixture<ChangeLastNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeLastNameComponent],
      providers: [ValidatorsService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeLastNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('определить переменную "lastName"', () => {
    component.ngOnInit();
    expect(component.lastName).toBeDefined();
  });
});
