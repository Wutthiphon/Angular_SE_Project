import { Observable, ReplaySubject, Subject, tap } from "rxjs";
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
  private updateProfileDetect: Subject<boolean> = new ReplaySubject<boolean>(0);

  constructor(private http: HttpClient) {}

  getProfileImage(): Observable<any> {
    return this.http.get(API_URL + "get_img", httpOptions);
  }

  updateProfileImage(image: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("file", image);
    return this.http
      .post(API_URL + "upload_img", formData)
      .pipe(tap(() => this.updateProfileDetect.next(true)));
  }

  updateProfileImageChange(): Observable<boolean> {
    return this.updateProfileDetect.asObservable();
  }

  getProfile(): Observable<any> {
    return this.http.get(API_URL + "getprofile", httpOptions);
  }

  updateProfile(
    prefix: string,
    firstname: string,
    lastname: string,
    email: string,
    gender: string
  ) {
    return this.http.post(
      API_URL + "updateProfile",
      {
        prefix: prefix,
        first_name: firstname,
        last_name: lastname,
        email: email,
        gender: gender,
      },
      httpOptions
    );
  }

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
