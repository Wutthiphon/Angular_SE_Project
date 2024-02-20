import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TokenStorageService } from "../services/token-storage.service";
import { environment } from "../../environments/environment";

const AUTH_API = environment.apiURL + "/";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient, private token: TokenStorageService) {}

  register(
    username: string,
    password: string,
    password_confirm: string,
    email: string,
    prefix: string,
    firstname: string,
    lastname: string,
    gender: string,
    permission_id: number
  ): Observable<any> {
    return this.http.post(
      AUTH_API + "register",
      {
        username: username,
        password: password,
        confirm_password: password_confirm,
        email: email,
        prefix: prefix,
        firstname: firstname,
        lastname: lastname,
        gender: gender,
        permission_id: permission_id,
      },
      httpOptions
    );
  }

  // signin(username: string, password: string): Observable<any> {
  //   return this.http.post(
  //     AUTH_API + 'signin',
  //     {
  //       username: username,
  //       password: password,
  //     },
  //     httpOptions
  //   );
  // }
}
