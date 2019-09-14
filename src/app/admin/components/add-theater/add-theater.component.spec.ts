import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddTheaterComponent } from './add-theater.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
const dialogMock = {
    closeAll: () => { },
    open: () => {
        return;
    }
};

describe('AddTheaterComponent', () => {
    let component: AddTheaterComponent;
    let fixture: ComponentFixture<AddTheaterComponent>;
    let matdialog: MatDialog;
    let debugElement: DebugElement;
    let nativeElement: HTMLElement;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, FormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule],
            declarations: [AddTheaterComponent],

            providers: [{
                provide: MatDialog,
                useValue: dialogMock
            },
            {
                provide: MatDialogRef,
                useValue: dialogMock
            }],
        }).compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(AddTheaterComponent);
        component = fixture.componentInstance;
        matdialog = TestBed.get(MatDialog);
        debugElement = fixture.debugElement.query(By.css('form'));
        nativeElement = debugElement.nativeElement;
        fixture.detectChanges();
    });
    it('shold call onSubmit', () => {
        spyOn(component, 'onSubmit');
        nativeElement = fixture.debugElement.query(By.css('button')).nativeElement;
        nativeElement.click();
        expect(component.onSubmit).toHaveBeenCalledTimes(1);
        // const spy = spyOn(matdialog, 'open');
        // component.onSubmit();
        // expect(spy).toHaveBeenCalled();

    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should call dialogok', () => {
        const spy = spyOn(matdialog, 'closeAll');
        component.dialogOk();
        expect(spy).toHaveBeenCalled();
    });
});