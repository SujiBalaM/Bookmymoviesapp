import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatDialogModule, MatDialog, MatInputModule, MatTabsModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MockComponent } from 'src/app/testing/mock-component';
import { Store } from '@ngrx/store';
import * as MovieState from '../../../reducers/index';
import { of } from 'rxjs';
import { HomeComponent } from './home.component';
import { HomeService } from '../../services/home.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

class MockStore {
    select() {
        return of([]);
    }
    dispatch() { }
}

class MockHomeService {
    getGenres() { }
    getNowshowing() { }
    getUpcomingMovies() { }
}

describe('Home Component', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let store: Store<MovieState.State>;
    let homeService: HomeService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                HomeComponent,
                //  MockComponent({
                //  selector: 'app-home-page',
                //  inputs: ['moviesList', 'upcomingList', 'theaterList', 'userPreference'],
                //  outputs: ['getNewNowPlayingMovies', 'getNewUpcomingMovies']
                //  })
            ],
            imports: [
                ReactiveFormsModule,
                FormsModule,
                MatFormFieldModule,
                MatDialogModule,
                MatInputModule,
                BrowserAnimationsModule,
                MatTabsModule
            ],
            providers: [{ provide: Store, useClass: MockStore }, { provide: HomeService, useClass: MockHomeService }],
            schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        store = TestBed.get(Store);
        homeService = TestBed.get(HomeService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get set of playing movies', () => {
        const spy = spyOn(homeService, 'getNowshowing');
        component.getNewSetofNowPlayingMovies(1);
        expect(spy).toHaveBeenCalledWith(1);
    });
});
