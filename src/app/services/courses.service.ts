import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";

const API = environment.apiURL + "/course/";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  update_course_image(image: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("file", image);
    return this.http.post(environment.apiURL + "/img/upload/course", formData);
  }

  getCourseList(): Observable<any> {
    return this.http.get(API + "getCourse", httpOptions);
  }

  getMyCourse(): Observable<any> {
    return this.http.get(API + "mycourse", httpOptions);
  }

  getCourseByID(course_id: number): Observable<any> {
    return this.http.get(API + "getcourse/" + course_id, httpOptions);
  }

  getCourseContent(course_id: number): Observable<any> {
    return this.http.get(API + "getCourseContent/" + course_id, httpOptions);
  }

  createCourse(
    course_name: string,
    course_description: string,
    course_have_price: boolean,
    cover_image: string | null,
    course_price: number | null
  ): Observable<any> {
    return this.http.post(
      API + "createCourse",
      {
        course_name: course_name,
        course_description: course_description,
        course_visibility: course_have_price,
        image: cover_image,
        cost: course_price,
      },
      httpOptions
    );
  }

  updateCourse(
    course_id: number,
    course_name: string,
    course_description: string,
    course_have_price: boolean,
    cover_image: string | null,
    course_price: number | null
  ): Observable<any> {
    return this.http.post(
      API + "updateCourse",
      {
        course_id: course_id,
        course_name: course_name,
        course_description: course_description,
        course_visibility: course_have_price,
        image: cover_image,
        cost: course_price,
      },
      httpOptions
    );
  }
}
