import { HttpClientModule } from '@angular/common/http';
import { TestBed, async, ComponentFixture, fakeAsync } from '@angular/core/testing';
import { HttpClient } from '@angular//common/http';
import { of, timer } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AdminService } from 'src/app/admin/services/admin.service';
import { HomeService } from './home.service';
import { Store } from '@ngrx/store';
import * as MovieState from '../../reducers/index';
import { delay } from 'rxjs/operators';
import { tick } from '@angular/core/src/render3';
import { Movie } from '../models/movie.model';

class MockHttpCalls {
    get(p1) { }
    put(p1, p2) { }
}

class MockStore {
    dispatch(p1) { }
}

describe('HomeService', () => {
    const nowShowingData = {
        results: [
            {
                title: 'SAHOO',
                id: 1,
                casts: ['PB', 'Sraddha'],
                crews: [],
                popularity: 'high',
                poster_path: 'NF',
                release_date: 'NA',
                original_language: 'ALL',
                overview: 'UNK',
                genre_ids: '21',
                vote_average: 3.5,
                vote_count: 8
            },
            {
                title: 'JAAN',
                id: 2,
                casts: ['MB', 'Sraddha'],
                crews: [],
                popularity: 'high',
                poster_path: 'NF',
                release_date: 'NA',
                original_language: 'ALL',
                overview: 'UNK',
                genre_ids: '24',
                vote_average: 3.5,
                vote_count: 8
            }
        ],
        cast: ['PB', 'SRD'],
        crew: ['SSR', 'TRV'],
        users: ['sai']
    };

    const movieData: Movie[] = [];

    const movdata = [
        {
            title: 'SAHOO',
            id: 1,
            casts: ['PB', 'Sraddha'],
            crews: [],
            popularity: 'high',
            poster_path: 'NF',
            release_date: 'NA',
            original_language: 'ALL',
            overview: 'UNK',
            genre_ids: '21',
            vote_average: 3.5,
            vote_count: 8
        }
    ];

    let service: HomeService;
    let http: HttpClient;
    let store: Store<MovieState.State>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                HomeService,
                {
                    provide: HttpClient,
                    useClass: MockHttpCalls
                },
                {
                    provide: Store,
                    useClass: MockStore
                }
            ]
        }).compileComponents();
    }));
    beforeEach(() => {
        service = TestBed.get(HomeService);
        http = TestBed.get(HttpClient);
        store = TestBed.get(Store);
        spyOn(http, 'get').and.returnValue(of(nowShowingData));
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get getnowshowing data', () => {
        // spyOn(http, 'get').and.returnValue(of(nowShowingData));
        service.getNowshowing();
        expect(http.get).toHaveBeenCalled();
    });

    it('should get upcoming movies', () => {
        // spyOn(http, 'get').and.returnValue(of(nowShowingData));
        service.getUpcomingMovies();
        expect(http.get).toHaveBeenCalled();
    });

    it('should get cast and crew', () => {
        // spyOn(http, 'get').and.returnValue(of(nowShowingData));
        service.getCastAndCrew(movieData);
        expect(http.get).not.toHaveBeenCalled();
        // service.getCastAndCrew(movdata);
        // expect(http.get).toHaveBeenCalled();
    });

    it('should make get and put requests', () => {
        // spyOn(http, 'get').and.returnValue(of(nowShowingData));
        const spyPutReq = spyOn(http, 'put').and.returnValue(of([]));
        service.setPreference('eng', 123);
        expect(spyPutReq).toHaveBeenCalled();
    });
});
