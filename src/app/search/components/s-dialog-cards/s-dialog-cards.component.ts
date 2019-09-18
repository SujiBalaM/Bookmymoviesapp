import { Component, OnInit, Input, AfterContentChecked, DoCheck } from '@angular/core';
import * as UserState from '../../../reducers/index';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-s-dialog-cards',
  templateUrl: './s-dialog-cards.component.html',
  styleUrls: ['./s-dialog-cards.component.scss']
})
export class SDialogCardsComponent implements AfterContentChecked, DoCheck, OnInit {
  @Input() movieList; // movie seperated by language
  @Input() movieFilter; // genre
  @Input() languageList; // list of languages
  @Input() selectedLanguage; // user language selection
  @Input() selectedVoteCount;
  userPreference: any = [];

  constructor(private userStore: Store<UserState.State>) { }

  ngOnInit(): void {
    this.userStore.select(UserState.userSelector).subscribe(result => {
      this.userPreference = result.preference;
    });
  }

  ngAfterContentChecked() { }

  ngDoCheck(): void { }
  trackByFn(index, item) {
    return index;
  }
}
