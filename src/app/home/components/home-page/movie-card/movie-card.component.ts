import { SeatReservationModalComponent } from './../../../../shared/components/modals/seat-reservation-modal/seat-reservation-modal.component';
import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormControl } from '@angular/forms';
import { TMDB_URLS } from '../../../../shared/config';
import { PreBookingComponent } from '../../../../shared/components/modals/pre-booking/pre-booking.component';

import { HomeConstants } from './../../../home.constants';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieCardComponent implements OnInit, OnChanges {
  @Input()
  movie;
  @Input()
  theaterList;
  @Input()
  category;
  imagesPath = TMDB_URLS.IMAGE_URL;
  castCrewPath = TMDB_URLS.CAST_CREW_SMALL;
  minDate = new Date();
  date = new FormControl(this.minDate);
  selectTheater: FormControl;
  selectedTheater;
  selectedTime;

  constructor(public dialog: MatDialog) { }

  ngOnInit() { }

  ngOnChanges() {
    this.selectTheater = new FormControl();
    this.selectTheater.setValue(this.theaterList[0]);
    this.selectedTheater = this.theaterList[0];
    this.selectTheater.valueChanges.subscribe(selectedTheater => {
      this.selectedTheater = selectedTheater;
    });
  }
  onValChange(val: string) {
    this.selectedTime = val;
  }
  isInvalid() {
    if (this.selectedTheater && this.selectedTheater.name) {
      return false;
    }
    return true;
  }
  checKToDialog() {
    this.category === HomeConstants.NOW_PLAYING ? this.openDialog() : this.preBookDialog();
  }
  preBookDialog() {
    const dialogRef = this.dialog.open(PreBookingComponent, {
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(() => { });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SeatReservationModalComponent, {
      width: sessionStorage.getItem('authDetails') ? window.innerWidth + 'px' : 'auto',
      height: sessionStorage.getItem('authDetails') ? '599px' : 'auto',
      data: { category: this.category },
      disableClose: true
    });

    const bookingInstance = dialogRef.componentInstance;
    bookingInstance.movieTitle = this.movie.title;
    bookingInstance.screen = this.selectedTheater && this.selectedTheater.name;
    bookingInstance.time = this.selectedTime;
    bookingInstance.movieList = this.movie;
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  trackCastandCrew(index, cast) {
    if (cast) {
      return cast.id;
    } else {
      return -1;
    }
  }
  trackByFn(index, item) {
    return index;
  }
}
