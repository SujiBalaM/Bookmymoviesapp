import { HttpClientModule } from '@angular/common/http';
import { AdminService } from './admin.service';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { HttpClient } from '@angular//common/http';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
const adminServiceStub = {
    saveNowPlaying: (arg1, arg2) => { },
    newTheater: arg1 => { }
};

const httpClientStub = {
    get: arg1 => ({
        subscribe: (success, err) => {
            const obj = {
                firstname: 'John',
                lastname: 'Doe',
                age: 50,
                eyecolor: 'blue',
                results: [
                    {
                        casts: ['casts', 'crew']
                    }
                ],
                cast: ['Banana', 'Orange', 'Apple', 'Mango'],
                crew: ['casts', 'crew']
            };
            const error = {
                message: 'Error'
            };
            success(obj);
            // err(error);
        }
    }),
    put: arg1 => ({
        subscribe: success => {
            const obj = [
                {
                    theaters: {}
                }
            ];
            success(obj);
            return {};
        }
    }),
    post: (arg1, arg2) => ({ pipe: () => ({ pipe: () => ({}) }) })
};

describe('AdminService', () => {
    let service: AdminService;
    // let fixture: ComponentFixture<AdminService>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                AdminService,
                {
                    provide: HttpClient, useValue: httpClientStub
                }]
        }).compileComponents();
    }));
    beforeEach(() => {
        service = TestBed.get(AdminService);
        // fixture.detectChanges();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
    it('should get new theatre', () => {
        const data = ['abc'];
        expect(service.newTheater).toBeDefined();
        spyOn(service, 'newTheater').and.callThrough();
        service.newTheater(data);
        expect(service.newTheater).toHaveBeenCalled();

    });
    it('should search movie', () => {
        const term = ['abc'];

        expect(service.searchMovie).toBeDefined();
        spyOn(service, 'searchMovie').and.callThrough();
        service.searchMovie(term);
        expect(service.searchMovie).toHaveBeenCalled();
    });
    it('should now playing movie', () => {
        const data = ['abc'];
        const id = 1;
        expect(service.saveNowPlaying).toBeDefined();
        spyOn(service, 'saveNowPlaying').and.callThrough();
        service.saveNowPlaying(data, id);
        expect(service.saveNowPlaying).toHaveBeenCalled();
    });
});
