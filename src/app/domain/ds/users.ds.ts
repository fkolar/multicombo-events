import {ComboBoxDataSource, MultiComboBoxDataSource} from "@fundamental-ngx/platform";
import {User} from "../ model/user.mode";
import {UserDataProvider} from "./user.dp";
import {Injectable} from "@angular/core";
import {debounceTime, distinctUntilChanged, takeUntil} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserDataSource extends MultiComboBoxDataSource<User> {

  constructor(dataProvider: UserDataProvider) {
    super(dataProvider)
  }


  override match(predicate?: string | Map<string, string>) {
    this._onDataRequested$.next();
    this._dataLoading = true;
    const searchParam = new Map();

    if (typeof predicate === 'string') {
      searchParam.set('query', predicate);
    } else if (predicate instanceof Map) {
      predicate.forEach((v, k) => searchParam.set(k, v));
    } else {
      throw new Error('DataSource.match() predicate can only accepts string and Map');
    }

    if (!searchParam.has('limit') && !this.limitless) {
      searchParam.set('limit', ComboBoxDataSource.MaxLimit);
    }

    this.dataProvider
      .fetch(searchParam)
      .pipe(
        takeUntil(this._onDestroy$),
      )
      .subscribe(
        (result: User[]) => {
          this._onDataReceived$.next();
          this._dataLoading = false;
          this._dataChanges.next(result);
        },
        () => {
          this._onDataReceived$.next();
          this._dataLoading = false;
        }
      );
  }
}
