import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieBookingComponent } from './movie-booking/movie-booking.component';
import { MaterialModule } from '../material.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { SeatReservationModalComponent } from './components/modals/seat-reservation-modal/seat-reservation-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiService } from './ui-service.service';
import { MovieDropdownsComponent } from './movie-dropdowns/movie-dropdowns.component';
import { ConfirmationModalComponent } from './components/modals/confirmation-modal/confirmation-modal.component';
import { PaymentBookingComponent } from './components/payment-booking/payment-booking.component';
import { SortMoviePipe } from './pipes/sort-movie.pipe';
import { HomeFilterPipe } from './pipes/home-filter.pipe';
import { PreBookingComponent } from './components/modals/pre-booking/pre-booking.component';
import { MatSnackBarComponent } from './components/mat-snack-bar/mat-snack-bar.component';
@NgModule({
  declarations: [
    MovieBookingComponent,
    SeatReservationModalComponent,
    MovieDropdownsComponent,
    ConfirmationModalComponent,
    PaymentBookingComponent,
    SortMoviePipe,
    HomeFilterPipe,
    PreBookingComponent,
    MatSnackBarComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  exports: [
    MovieBookingComponent,
    SeatReservationModalComponent,
    MovieDropdownsComponent,
    SortMoviePipe,
    HomeFilterPipe,
    PreBookingComponent,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [MatSnackBarComponent],
  entryComponents: [ConfirmationModalComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
