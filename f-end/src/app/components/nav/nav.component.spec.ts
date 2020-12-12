import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';

import { NavComponent } from './nav.component';

describe('NavComponent', () => {
    let component: NavComponent;
    let fixture: ComponentFixture<NavComponent>;
    let router: Router;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MatSidenavModule, BrowserAnimationsModule],
            declarations: [NavComponent],
            providers: [
                { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        router = TestBed.inject(Router);
    });

    it('существует ли компонент', () => {
        expect(component).toBeTruthy();
    });

    describe('метод logout()', () => {
        it('должен вызвать метод "clear" у "localStorage"', () => {
            spyOn(localStorage, 'clear');
            component.logout();
            expect(localStorage.clear).toHaveBeenCalled();
        });

        it('должен направить по пути "auth/login"', () => {
            component.logout();
            expect(router.navigate).toHaveBeenCalledWith(['auth/login']);
        });

    });

    describe('метод openSidenav()', () => {
        it('должен открывать боковое меню путем присвоения переменной "isSideNavOpened" значения "true"', () => {
            component.openSidenav();
            expect(component.isSideNavOpened).toBeTrue();
        });
    });

    describe('метод closeSidenav()', () => {
        it('должен закрывать боковое меню путем присвоения переменной "isSideNavOpened" значения "false"', () => {
            component.closeSidenav();
            expect(component.isSideNavOpened).toBeFalse();
        });
    });

});
