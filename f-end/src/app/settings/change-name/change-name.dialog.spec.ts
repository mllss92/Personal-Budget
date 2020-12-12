import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeNameComponent } from './change-name.dialog';
import { ValidatorsService } from './../../shared/validators/validators.service';

describe('AppComponent', () => {
  let component: ChangeNameComponent;
  let fixture: ComponentFixture<ChangeNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeNameComponent],
      providers: [ValidatorsService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('определить переменную "name"', () => {
    component.ngOnInit();
    expect(component.name).toBeDefined();
  });
});
