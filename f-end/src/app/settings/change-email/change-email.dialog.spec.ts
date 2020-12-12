import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeEmailComponent } from './change-email.dialog';

describe('AppComponent', () => {
  let component: ChangeEmailComponent;
  let fixture: ComponentFixture<ChangeEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeEmailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('определить переменную "email"', () => {
    component.ngOnInit();
    expect(component.email).toBeDefined();
  });
});
