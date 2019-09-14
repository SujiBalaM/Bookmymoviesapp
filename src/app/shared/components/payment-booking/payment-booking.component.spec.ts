import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { PaymentBookingComponent } from './payment-booking.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, } from '@angular/forms';
import { MatDialogModule, MatFormFieldModule, MatInputModule, MatMenuModule, MatSelectModule } from '@angular/material';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
const dialogMock = {
    closeAll: () => { },
    open: () => {
        return;
    }
};

describe('PaymentBookingComponent', () => {
    let component: PaymentBookingComponent;
    let fixture: ComponentFixture<PaymentBookingComponent>;
    let matdialog: MatDialog;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PaymentBookingComponent],
            imports: [RouterTestingModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatMenuModule, MatSelectModule, MatInputModule, BrowserAnimationsModule],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [{ provide: MatDialog, useValue: dialogMock }]
        }).compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(PaymentBookingComponent);
        component = fixture.componentInstance;
        matdialog = TestBed.get(MatDialog);
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should open confirmationDialog', () => {
        const spy = spyOn(matdialog, 'open');
        component.openConfirmDialog();
        expect(spy).toHaveBeenCalled();

    });
});