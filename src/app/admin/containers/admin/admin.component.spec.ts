import { AdminComponent } from './admin.component';
import { AdminService } from './../../services/admin.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { Store, State, StoreModule } from '@ngrx/store';
import * as MovieState from '../../../reducers/index';
import { MaterialModule } from 'src/app/material.module';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

export class MockAdminService {
    newTheater(x: string) {
        return of(x);
    }
}
export class MockStore {
    dispatch() { }
    select() {
        return of([]);
    }
}
describe('AdminComponent', () => {
    let component: AdminComponent;
    let fixture: ComponentFixture<AdminComponent>;
    let adminService: AdminService;
    let store: Store<MovieState.State>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AdminComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            imports: [StoreModule, MaterialModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule],
            providers: [{ provide: Store, useClass: MockStore },
            { provide: AdminService, useClass: MockAdminService }],

        }).compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(AdminComponent);
        component = fixture.componentInstance;
        store = TestBed.get(Store);
        adminService = TestBed.get(AdminService);
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should add theater', () => {
        let spy = spyOn(adminService, 'newTheater');
        component.addTheater({ formData: 'xcv' });

        expect(spy).toHaveBeenCalled();

    });

});