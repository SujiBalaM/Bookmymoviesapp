import { MaterialModule } from './../../../material.module';
import { AdminService } from './../../services/admin.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestBed, ComponentFixture, fakeAsync, tick, flush, async } from '@angular/core/testing';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ChangeShowComponent } from './change-show.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { of } from 'rxjs';
export class MockAdminService {
    searchMovie(val) {
        return of([]);
    }
    saveNowPlaying(p1, p2) {
    }
}
const dialogMock = {
    closeAll: () => { },
    open: () => {
        return;
    }
};
describe('ChangeShowComponent', () => {
    let component: ChangeShowComponent;
    let fixture: ComponentFixture<ChangeShowComponent>;
    let adminService: AdminService;
    let matdialog: MatDialog;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ChangeShowComponent],
            imports: [MaterialModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule],
            providers: [{
                provide: AdminService, useClass: MockAdminService
            },
            { provide: MatDialogRef, useValue: dialogMock }

            ]
        }).compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(ChangeShowComponent);
        component = fixture.componentInstance;
        matdialog = TestBed.get(MatDialog);
        adminService = TestBed.get(AdminService);
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should add movie', () => {
        expect(component.nowShowing.length).toEqual(0);
        component.addMovie({ name: 'ABC', id: 1 });
        expect(component.nowShowing.length).toEqual(1);

    });
    it('should call save method', () => {
        const spy = spyOn(matdialog, 'open');
        component.save();
        expect(spy).toHaveBeenCalled();
    });
    it('should close', () => {
        expect(component.nowShowing.length).toEqual(0);
    });
    it('should call dialogok', () => {
        const spy = spyOn(matdialog, 'closeAll');
        component.dialogOk();
        expect(spy).toHaveBeenCalled();
        expect(component.movieResult.length).toEqual(0);
    });
});
