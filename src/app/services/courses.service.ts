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
    course_price: number | null,
    payment_image: string
  ): Observable<any> {
    return this.http.post(
      API + "createCourse",
      {
        course_name: course_name,
        course_description: course_description,
        course_visibility: course_have_price,
        image: cover_image,
        cost: course_price,
        image_account: payment_image,
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
    course_price: number | null,
    payment_image: string
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
        image_account: payment_image,
      },
      httpOptions
    );
  }

  registerCourse(course_id: number): Observable<any> {
    return this.http.post(
      API + "registerCourse",
      { course_id: course_id },
      httpOptions
    );
  }

  uploadSlipImage(image: string, registration_id: number): Observable<any> {
    return this.http.post(
      API + "payment/submit_document",
      { registration_id: registration_id, img_payment: image },
      httpOptions
    );
  }

  teacherApproveStudentRegistration(reg_id: number): Observable<any> {
    return this.http.post(
      API + "payment/approve",
      { registration_id: reg_id },
      httpOptions
    );
  }

  teacherRejectStudentRegistration(
    reg_id: number,
    comment: string
  ): Observable<any> {
    return this.http.post(
      API + "payment/reject",
      { registration_id: reg_id, comment: comment },
      httpOptions
    );
  }

  getCourseLesson(course_id: number): Observable<any> {
    return this.http.get(API + "lesson/" + course_id, httpOptions);
  }

  createLesson(course_id: number, lesson_name: string): Observable<any> {
    return this.http.post(
      API + "createLesson",
      { course_id: course_id, lesson_name: lesson_name },
      httpOptions
    );
  }

  editLesson(lesson_id: number, lesson_name: string): Observable<any> {
    return this.http.post(
      API + "updateLesson",
      { lesson_id: lesson_id, lesson_name: lesson_name },
      httpOptions
    );
  }

  deleteLesson(lesson_id: number): Observable<any> {
    return this.http.delete(
      API + "delete/course_lesson/" + lesson_id,
      httpOptions
    );
  }

  getCourseLessonChapter(lesson_id: number): Observable<any> {
    return this.http.get(API + "getCourseContent/" + lesson_id, httpOptions);
  }

  createCourseLessonChapter(
    lesson_id: number,
    content_name: string,
    content_data: string,
    content_type: number
  ) {
    return this.http.post(
      API + "createContent ",
      {
        lesson_id: lesson_id,
        content_name: content_name,
        content_data: content_data,
        content_type: content_type,
      },
      httpOptions
    );
  }
}
