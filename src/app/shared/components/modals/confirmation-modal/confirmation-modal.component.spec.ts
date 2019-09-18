import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationModalComponent } from './confirmation-modal.component';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { MatInputModule } from '@angular/material';
import { Router } from '@angular/router';
class MockRouter {
    navigate(path) { }
}
const matDialogRefStub = { close: () => ({}) };
const matDialogStub = {};
describe('PreBookingComponent', () => {
    let component: ConfirmationModalComponent;
    let fixture: ComponentFixture<ConfirmationModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ConfirmationModalComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            imports: [MatDialogModule, BrowserAnimationsModule, MatInputModule],
            providers: [{ provide: MatDialogRef, useValue: matDialogRefStub },
            { provide: MatDialog, useValue: matDialogStub },
            { provide: Router, useClass: MockRouter },
            { provide: MAT_DIALOG_DATA, useValue: matDialogStub }]
        }).compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(ConfirmationModalComponent);
        component = fixture.componentInstance;

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
    it('should run onClose()', async () => {
        const matDialogRefStubs = fixture.debugElement.injector.get(
            MatDialogRef
        );
        spyOn(matDialogRefStub, 'close').and.callThrough();
        component.onCloseConfirm();
        expect(matDialogRefStubs.close).toHaveBeenCalled();

    });

});
