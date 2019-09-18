import { Component, OnInit, Inject, Input, OnChanges, OnDestroy } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { SeatReservationModalComponent } from '../../../shared/components/modals/seat-reservation-modal/seat-reservation-modal.component';
import { FormControl } from '@angular/forms';
import { TMDB_URLS } from '../../../shared/config';
import { PreBookingComponent } from '../../../shared/components/modals/pre-booking/pre-booking.component';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss']
})
export class MoviePageComponent implements OnInit, OnChanges, OnDestroy {
  private subscription: Subscription;
  imagesPath = TMDB_URLS.IMAGE_URL;
  castCrew = TMDB_URLS.CAST_CREW_BIG;
  @Input() movieDescription;
  @Input() theaterList;
  @Input() category;
  selectTheater: FormControl;
  minDate = new Date();
  date = new FormControl(this.minDate);
  selectedTheater;
  selectedDate;
  rating = new Array(5);
  selectedTime;
  constructor(public dialog: MatDialog) {
    for (let i = 0; i <= 4; i++) {
      this.rating[i] = i <= 3 ? true : false;
    }
    this.selectTheater = new FormControl();
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }
  ngOnChanges() {
    this.selectTheater = new FormControl();
    this.selectTheater.setValue(this.theaterList[0]);
    this.selectedTheater = this.theaterList[0];
    this.selectTheater.valueChanges.subscribe(selectedTheater => {
      this.selectedTheater = selectedTheater;
    });
    this.date.valueChanges.subscribe((value: Date) => {
      this.selectedDate = value.toJSON();
    });
  }
  checKToDialog() {
    this.category === 'nowPlaying' ? this.openDialog() : this.preBookDialog();
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
      data: 'test'
    });
    const bookingInstance = dialogRef.componentInstance;
    bookingInstance.movieTitle = this.movieDescription.title;
    bookingInstance.screen = this.selectedTheater.name;
    bookingInstance.time = this.selectedTime;
    bookingInstance.movieList = this.movieDescription;
    dialogRef.afterClosed().subscribe(result => {

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
  trackCastandCrew(index, cast) {
    if (cast) {
      return cast.id;
    } else {
      return -1;
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
