import { HomeService } from './../../home/services/home.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestBed, ComponentFixture, fakeAsync, tick, flush, async } from '@angular/core/testing';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MovieDropdownsComponent } from './movie-dropdowns.component';
import { MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";

import { of } from 'rxjs';
export class MockHomeService {
    getGenres(val) {
        return of({});
    }
}
describe('ChangeShowComponent', () => {
    let component: MovieDropdownsComponent;
    let fixture: ComponentFixture<MovieDropdownsComponent>;
    let homeService: HomeService;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MovieDropdownsComponent],
            imports: [ReactiveFormsModule, FlexLayoutModule, MatSelectModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule],
            providers: [{
                provide: HomeService, useClass: MockHomeService
            },

            ]
        }).compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(MovieDropdownsComponent);
        component = fixture.componentInstance;
        homeService = TestBed.get(HomeService);
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    // it('should call ngoninit', () => {
    //     const spy = spyOn(homeService, 'getGenres');
    //     component.ngOnInit();
    //     expect(spy).toHaveBeenCalled();
    // });
});
