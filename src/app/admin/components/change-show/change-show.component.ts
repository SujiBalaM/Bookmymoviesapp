import { Component, OnInit, Input, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { AdminConstants } from '../../admin.constants';

@Component({
  selector: 'app-change-show',
  templateUrl: './change-show.component.html',
  styleUrls: ['./change-show.component.scss']
})
export class ChangeShowComponent implements OnInit, OnDestroy {
  @Input() theaterList;
  movieInput: FormControl;
  selectTheater: FormControl;
  movieResult;
  selectedTheater;
  nowShowing = [];
  nowPlaying = [];
  @ViewChild('successDialog') successDialog: TemplateRef<any>;
  private subscription: Subscription;
  divLabel = AdminConstants.NEW_MOVIES;
  saveIcon = AdminConstants.SAVE;
  cancelIcon = AdminConstants.CANCEL;
  okIcon = AdminConstants.OK;
  addIcon = AdminConstants.ADD;

  constructor(private adminService: AdminService, private matDialog: MatDialog) {
    this.movieInput = new FormControl();
    this.selectTheater = new FormControl();
  }

  ngOnInit() {
    this.movieInput.valueChanges.subscribe(value => {
      if (value) {
        this.adminService.searchMovie(value).subscribe(movies => {
          this.movieResult = movies['results'];
        });
      }
    });
    this.selectTheater.valueChanges.subscribe(value => {
      this.selectedTheater = value;
      this.nowShowing = [];
    });
  }
  addMovie(movie) {
    this.nowShowing.push(movie.name);
    this.nowPlaying.push(movie.id);
  }
  save() {
    this.matDialog.open(this.successDialog);
    this.adminService.saveNowPlaying(this.nowPlaying, this.selectTheater['tid']);
  }
  cancel() {
    this.nowShowing = [];
  }
  dialogOk() {
    this.nowShowing = [];
    this.movieInput.reset();
    this.selectTheater.reset();
    this.matDialog.closeAll();
    this.movieResult = [];
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  trackByFn(index, cast) {
    return index;
  }
}
