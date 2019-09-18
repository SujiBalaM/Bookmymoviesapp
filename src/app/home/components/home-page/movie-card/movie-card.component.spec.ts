import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
    MatFormFieldModule,
    MatDialogModule,
    MatDialog,
    MatInputModule,
    MatTabsModule,
    MatCardModule,
    MatDatepickerModule,
    MatSelectModule,
    MatIconModule,
    MatNativeDateModule,
    MatAutocompleteModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { MovieCardComponent } from './movie-card.component';
// import { MockComponent } from 'src/app/testing/mock-component';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

export class MockDialog {
    open(p1, p2) { }
    closeAll() { }
}

class TestComponent { }

describe('MovieCardComponent', () => {
    let component: MovieCardComponent;
    let fixture: ComponentFixture<MovieCardComponent>;
    let dialog: MatDialog;
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of({}), close: null });
    dialogRefSpyObj.componentInstance = { body: '' };
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            declarations: [
                MovieCardComponent
                // MockComponent({
                // selector: 'app-movie-booking'
                // })
            ],
            imports: [
                MatAutocompleteModule,

                ReactiveFormsModule,
                FormsModule,
                MatFormFieldModule,
                MatDialogModule,
                MatInputModule,
                BrowserAnimationsModule,
                MatTabsModule,
                MatCardModule,
                MatDatepickerModule,
                MatSelectModule,
                RouterModule,
                MatIconModule,
                MatDatepickerModule,
                MatNativeDateModule,
                RouterTestingModule
            ],
            providers: [{ provide: MatDialog, useClass: MockDialog }, MatDatepickerModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MovieCardComponent);
        component = fixture.componentInstance;
        dialog = TestBed.get(MatDialog);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should open prebook dialog', () => {
        const spy = spyOn(dialog, 'open').and.returnValue(dialogRefSpyObj);
        component.preBookDialog();
        expect(spy).toHaveBeenCalled();
    });

    it('checking open dialog method', () => {
        const spy = spyOn(dialog, 'open').and.callFake(() => {
            return dialogRefSpyObj;
        });
        component.openDialog();
        expect(spy).toHaveBeenCalled();
    });

    it('should call cast and crew', () => {
        const spy = spyOn(component, 'trackCastandCrew').and.callThrough();
        component.trackCastandCrew(1, null);
        expect(spy).toHaveBeenCalledWith(1, null);
    });
});
