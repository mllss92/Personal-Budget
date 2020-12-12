import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordComponent } from './change-password.dialog';
import { CheckPasswordService } from './check-password.service';
import { ValidatorsService } from './../../shared/validators/validators.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChangePasswordComponent],
      providers: [ValidatorsService, CheckPasswordService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('определить переменную "form" и вызвать метод "checkPasswordStrength"', () => {
    spyOn(component, 'checkPasswordStrength');
    component.ngOnInit();
    expect(component.form).toBeDefined();
    expect(component.checkPasswordStrength).toHaveBeenCalled();
  });

  describe('метод checkPasswordStrength()', () => {
    it('должен присвоить результат в переменную "progress"', () => {
      const checkPasswordService = TestBed.inject(CheckPasswordService);
      spyOn(checkPasswordService, 'checkPassword').and.returnValue(of(2));
      component.checkPasswordStrength();
      expect(component.progress).toBe(2);
    });
  });
});
