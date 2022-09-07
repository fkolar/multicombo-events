import {User} from "../ model/user.mode";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BaseDataProvider} from "@fundamental-ngx/platform";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class UserDataProvider extends BaseDataProvider<User> {


  constructor(private httpClient: HttpClient) {
    super([]);
  }

  override fetch(params: Map<string, any>): Observable<User[]> {
    console.log('Fetch Called: ', params)
    this.values = this.httpClient.get<User[]>("assets/data.json");
    return super.fetch(params);
  }
}
