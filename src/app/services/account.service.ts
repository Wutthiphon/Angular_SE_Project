import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";

const API_URL = environment.apiURL + "/profile/";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: "root",
})
export class AccountService {
  constructor(private http: HttpClient) {}

  changePassword(old_password: string, new_password: string): Observable<any> {
    return this.http.post(
      API_URL + "updatePassword",
      {
        password: old_password,
        new_password: new_password,
      },
      httpOptions
    );
  }
}
