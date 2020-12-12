import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ToasterService } from './../../shared/services/toaster.service';
import { AuthService } from './../service/auth.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let de: DebugElement;
    let elem: HTMLElement;

    const authSpy = {
        login: jasmine.createSpy('login')
    };
    const routerSpy = {
        navigate: jasmine.createSpy('navigate')
    };



    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MatSnackBarModule],
            declarations: [LoginComponent],
            providers: [ToasterService, { provide: Router, useValue: routerSpy }, { provide: AuthService, useValue: authSpy }]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('.container'));
        elem = de.nativeElement;
    });

    it('существует ли компонент', () => {
        expect(component).toBeTruthy();
    });

    it('должен содержать форму и поля ввода', () => {
        expect(elem.innerHTML).toContain('form');
        expect(elem.innerHTML).toContain('input');
        expect(elem.innerHTML).toContain('type="email"');
        expect(elem.innerHTML).toContain('type="password"');
    });

    it('должен направить по пути "auth/registration"', () => {
        component.navigateToRegister();
        expect(routerSpy.navigate).toHaveBeenCalledWith(['auth/registration']);
    });

    it('должен вызвать метод login у AuthService', () => {
        component.logForm.setValue({
            email: 'test@test.com',
            password: '123qweE'
        });
        component.login();
        expect(authSpy.login).toHaveBeenCalled();
    });

    it('случай когда форма не валидна', () => {
        expect(component.login()).toBeFalsy();
    });
});
