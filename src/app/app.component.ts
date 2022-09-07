import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MobileModeConfig} from "@fundamental-ngx/core";
import {MultiComboboxSelectionChangeEvent} from "@fundamental-ngx/platform";
import {HttpClient} from "@angular/common/http";
import {User} from "./domain/ model/user.mode";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  dataSource = [
    {name: 'Apple', type: 'Fruits'},
    {name: 'Banana', type: 'Fruits'},
    {name: 'Pineapple', type: 'Fruits'},
    {name: 'Strawberry', type: 'Fruits'},
    {name: 'Broccoli', type: 'Vegetables'},
    {name: 'Carrot', type: 'Vegetables'},
    {name: 'Jalapeño', type: 'Vegetables'},
    {name: 'Spinach', type: 'Vegetables'}
  ];

  data: User[] = [];

  selectedItems = [];

  mobileConfig: MobileModeConfig = {
    title: 'Title',
    approveButtonText: 'Save',
    cancelButtonText: 'Cancel',
    hasCloseButton: true
  };


  constructor(private httpClient: HttpClient) {
  }


  ngOnInit() {
    this.httpClient.get<User[]>("assets/data.json").subscribe(data => {
      this.data = data;
    })
  }

  onSelect(item: MultiComboboxSelectionChangeEvent): void {
    this.selectedItems = item.selectedItems;

    console.log('onSelect called', item);
  }
}
