import { Component, OnInit, EventEmitter, Output, Input, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatInputModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmationModalComponent } from '../../components/modals/confirmation-modal/confirmation-modal.component';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-payment-booking',
  templateUrl: './payment-booking.component.html',
  styleUrls: ['./payment-booking.component.scss']
})
export class PaymentBookingComponent implements OnInit {
  form = new FormGroup({
    cardHolder: new FormControl(),
    cardNumber: new FormControl(),
    expiryDate: new FormControl(),
    year: new FormControl(),
    cvv: new FormControl()
  });
  firstParam;
  secondParam;
  thirdParam;
  fourthParam;
  fiveParam;
  constructor(public dialog: MatDialog, private route: ActivatedRoute) {
    this.firstParam = this.route.snapshot.params.movieTitle;
    this.secondParam = this.route.snapshot.params.theatre;
    this.thirdParam = this.route.snapshot.params.time;
    this.fourthParam = this.route.snapshot.params.seat;
    this.fiveParam = this.route.snapshot.params.total;
  }

  ngOnInit() { }
  openConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      disableClose: true,
      data: {
        name: this.firstParam, theater: this.secondParam,
        time: this.thirdParam, seat: this.fourthParam, total: this.fiveParam
      }
    });
    // dialogRef.afterClosed().subscribe(result => {
    // });
  }
}


