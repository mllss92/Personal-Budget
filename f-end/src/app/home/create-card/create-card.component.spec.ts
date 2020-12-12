import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCardComponent } from './create-card.component';

describe('CreateCardComponent', () => {
    let component: CreateCardComponent;
    let fixture: ComponentFixture<CreateCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CreateCardComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('существует ли компонент', () => {
        expect(component).toBeTruthy();
    });

    describe('метод close()', () => {
        it('должен вызвать метод "emit" у объекта "cancel"', () => {
            spyOn(component.cancel, 'emit');
            component.close();
            expect(component.cancel.emit).toHaveBeenCalled();
        });
    });

    describe('метод onSubmit()', () => {
        it('должен ', () => {
            spyOn(component.create, 'emit');
            component.createForm.setValue({
                name: 'test',
                image: 'test'
            });
            component.onSubmit();
            expect(component.create.emit).toHaveBeenCalledWith(component.createForm.value);
        });
    });
});
