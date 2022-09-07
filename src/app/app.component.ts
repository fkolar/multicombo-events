import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {MultiComboboxComponent, MultiComboboxSelectionChangeEvent} from "@fundamental-ngx/platform";
import {UserDataSource} from "./domain/ds/users.ds";
import {debounceTime, distinctUntilChanged, filter, Subject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  selectedItems = [];

  @ViewChild('combo', {static: true})
  combo!: MultiComboboxComponent;


  subject = new Subject()

  constructor(public userDataSource: UserDataSource) {
  }


  ngOnInit() {
    if (this.combo) {
      this.combo.searchTermChanged = (text: string = this.combo.inputText) => {
        this.subject.next(text);
        // this.userDataSource.match(map);
        // this.combo.markForCheck();
      };
    }

    this.subject.pipe(
      filter(Boolean),
      debounceTime(400),
      distinctUntilChanged(),
    ).subscribe((text) => {
      console.log('My search: ', text);
      if (text) {
        this.combo.open();
      }
      const map = new Map();
      map.set('query', text);
      if (!this.combo.limitless) {
        map.set('limit', this.combo.limitless);
      }
      this.userDataSource.match(map);
      this.combo.markForCheck();
    })

  }

  onSelect(item: MultiComboboxSelectionChangeEvent): void {
    this.selectedItems = item.selectedItems;

    console.log('onSelect called', item);
  }
}
