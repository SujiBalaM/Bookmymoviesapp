import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-mat-snack-bar',
  templateUrl: './mat-snack-bar.component.html',
  styleUrls: ['./mat-snack-bar.component.scss']
})
export class MatSnackBarComponent implements OnInit {

  constructor(public snackBar: MatSnackBar) { }
  openSnackBar(message: string, action: string, className: string) {

    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      // horizontalPosition: 'end',
      panelClass: [className],
    });
  }

  ngOnInit() {
  }

}
