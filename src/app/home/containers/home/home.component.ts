import { theaterList } from './../../../reducers/index';
import { MoviesState } from './../../store/reducers/home.reducer';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, State, select } from '@ngrx/store';
import * as MovieState from '../../../reducers/index';
import * as UserState from '../../../reducers/index';

import { HomeService } from '../../services/home.service';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  nowPlayingMoviesList: Observable<any[]>;
  upcomingMoviesList: Observable<any[]>;
  genresList: any = [];
  theaterList: Observable<any[]>;
  userPreference: Observable<any>;

  constructor(
    private store: Store<MovieState.State>,
    private userStore: Store<UserState.State>,
    private homeService: HomeService
  ) { }

  ngOnInit() {
    this.getNewSetofNowPlayingMovies(1);
    this.nowPlayingMoviesList = this.store.select(MovieState.nowPlayingMoviesSelector);
    this.upcomingMoviesList = this.store.select(MovieState.upcomingMovieSelector);
    this.theaterList = this.store.pipe(select(MovieState.theaterList), map(result => Object.values(result)));
    this.userPreference = this.userStore.select(UserState.userSelector);
    this.genresList = this.homeService.getGenres();
  }

  getNewSetofNowPlayingMovies(page) {
    this.homeService.getNowshowing(page);
  }
  getNewSetofComingMovies(page) {
    this.homeService.getUpcomingMovies(page);
  }

}
