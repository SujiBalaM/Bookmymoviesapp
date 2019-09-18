import { HomeService } from './../../services/home.service';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './home-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatFormFieldModule, MatInputModule, MatMenuModule, MatSelectModule } from '@angular/material';
import { HomeComponent } from '../../containers/home/home.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
class MockHomeService {

}
describe('HomePageComponent', () => {
    let component: HomePageComponent;
    let fixture: ComponentFixture<HomePageComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HomePageComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule,
                MatMenuModule, MatSelectModule, MatInputModule, BrowserAnimationsModule],
            providers: [HomeService, { provide: HomeService, useClass: MockHomeService }]

        }).compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(HomePageComponent);
        component = fixture.componentInstance;
        component.moviesList = [];
        component.upcomingList = [];
        component.theaterList = [];
        component.userPreference = [];
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should trackMovie on nagative', () => {
        component.trackMovie(1, null);

    });
    it('should trackMovie on positive', () => {
        const movie = { id: '12' };
        component.trackMovie(1, movie);

    });
    // it('should trackMovie else', () => {
    //     const movie1 = {

    //     };
    // });
    it('shoud cal tab change', () => {
        const spy = spyOn(component, 'tabChanged');
        component.tabChanged(2);
        expect(spy).toHaveBeenCalled();
    });
    it('should get language', () => {
        const spy = spyOn(component, 'getLanguage');
        component.getLanguage('eng');
        expect(spy).toHaveBeenCalled();
    });
    it('should get genere', () => {
        const spy = spyOn(component, 'getGenre');
        component.getGenre('e');
        expect(spy).toHaveBeenCalled();
    });
});
