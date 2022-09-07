import {MultiComboBoxDataSource} from "@fundamental-ngx/platform";
import {User} from "../ model/user.mode";
import {UserDataProvider} from "./user.dp";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class UserDataSource extends MultiComboBoxDataSource<User> {

  constructor(dataProvider: UserDataProvider) {
    super(dataProvider)
  }
}
