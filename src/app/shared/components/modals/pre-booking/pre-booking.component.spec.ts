import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreBookingComponent } from './pre-booking.component';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { MatInputModule } from '@angular/material';
import { Router } from '@angular/router';
const dialogMock = {
    closeAll: () => { },
    open: () => {
        return;
    }
}
const matDialogRefStub = { close: () => ({}) };
const matDialogStub = {};
describe('PreBookingComponent', () => {
    let component: PreBookingComponent;
    let fixture: ComponentFixture<PreBookingComponent>;
    let matdialog: MatDialog;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PreBookingComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            imports: [MatDialogModule, BrowserAnimationsModule, MatInputModule],
            providers: [{ provide: MatDialogRef, useValue: matDialogRefStub },
            { provide: MatDialog, useValue: dialogMock }, { provide: MAT_DIALOG_DATA, useValue: matDialogStub }]
        }).compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(PreBookingComponent);
        component = fixture.componentInstance;
        matdialog = TestBed.get(MatDialog);
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    // it('should close dialog on noclick', () => {
    //     const spy = spyOn(mat, 'closeAll');
    //     component.onNoClick();
    //     expect(spy).toHaveBeenCalled();
    // });
    it('should run #onNoClick()', async () => {
        const matDialogRefStub = fixture.debugElement.injector.get(
            MatDialogRef
        );
        spyOn(matDialogRefStub, 'close').and.callThrough();
        component.onNoClick();
        expect(matDialogRefStub.close).toHaveBeenCalled();

    });

});