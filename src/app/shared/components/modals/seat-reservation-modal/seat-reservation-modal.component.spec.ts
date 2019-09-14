import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/throw';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Component, Directive } from '@angular/core';
import { SeatReservationModalComponent } from './seat-reservation-modal.component';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { Router } from '@angular/router';

@Injectable()
class MockRouter {
    navigate(path) { }
}
describe('SeatReservationModalComponent', () => {
    let fixture;
    let component;

    beforeEach(() => {
        const matDialogRefStub = { close: () => ({}) };
        const matDialogStub = {};
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, MatDialogModule, BrowserAnimationsModule,
                MatFormFieldModule,
                MatInputModule,
                MatSelectModule
            ],
            declarations: [
                SeatReservationModalComponent
            ],
            providers: [
                { provide: MatDialogRef, useValue: matDialogRefStub },
                { provide: MatDialog, useValue: matDialogStub },
                { provide: Router, useClass: MockRouter },
                { provide: MAT_DIALOG_DATA, useValue: matDialogStub }

            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
        fixture = TestBed.createComponent(SeatReservationModalComponent);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    });

    it('should create a component', async () => {
        expect(component).toBeTruthy();
    });

    it('should run #ngOnInit()', async () => {
        // const result = component.ngOnInit();


    });

    it('should run #onNoClick()', async () => {
        const matDialogRefStub = fixture.debugElement.injector.get(
            MatDialogRef
        );
        const matDialogStub = fixture.debugElement.injector.get(
            MatDialog
        );
        spyOn(matDialogRefStub, 'close').and.callThrough();
        component.onNoClick();
        expect(matDialogRefStub.close).toHaveBeenCalled();

    });

    it('should run #onCloseConfirm()', async () => {
        const matDialogRefStub = fixture.debugElement.injector.get(
            MatDialogRef
        );
        const matDialogStub = fixture.debugElement.injector.get(
            MatDialog
        );
        spyOn(matDialogRefStub, 'close').and.callThrough();
        component.onCloseConfirm();
        expect(matDialogRefStub.close).toHaveBeenCalled();
        // const result = component.save();
    });

    it('should run #onCloseCancel()', async () => {
        const matDialogRefStub = fixture.debugElement.injector.get(
            MatDialogRef
        );
        const matDialogStub = fixture.debugElement.injector.get(
            MatDialog
        );
        spyOn(matDialogRefStub, 'close').and.callThrough();
        component.onCloseCancel();
        expect(matDialogRefStub.close).toHaveBeenCalled();
    });


});

