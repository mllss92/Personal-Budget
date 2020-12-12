import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ToasterService } from './../../shared/services/toaster.service';
import { AuthService } from './../service/auth.service';
import { ValidatorsService } from './../../shared/validators/validators.service';
import { RegistrationComponent } from './registration.component';

describe('RegistrationComponent', () => {
    let component: RegistrationComponent;
    let fixture: ComponentFixture<RegistrationComponent>;
    let de: DebugElement;
    let elem: HTMLElement;

    const routerSpy = {
        navigate: jasmine.createSpy('navigate')
    };
    const authSpy = {
        register: jasmine.createSpy('register')
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MatSnackBarModule],
            declarations: [RegistrationComponent],
            providers: [
                ValidatorsService,
                ToasterService,
                { provide: AuthService, useValue: authSpy },
                { provide: Router, useValue: routerSpy }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RegistrationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('.register'));
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
        expect(elem.innerHTML).toContain('type="text"');
    });

    it('должен направить по пути "auth/login"', () => {
        component.cancelRegistration();
        expect(routerSpy.navigate).toHaveBeenCalledWith(['auth/login']);
    });

    it('должен вызвать метод "register" y AuthService', () => {
        const value = {
            email: 'test@test.com',
            password: '123qweE',
            confirmPassword: '123qweE',
            name: 'Test',
            lastName: 'Test'
        };
        component.regForm.setValue(value);
        component.register();
        delete value.confirmPassword;
        expect(authSpy.register).toHaveBeenCalledWith(value);
    });

    it('случай когда форма не валидна', () => {
        expect(component.register()).toBeFalsy();
    });

});
