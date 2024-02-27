import { Component } from "@angular/core";
import { CoursesService } from "../services/courses.service";
import { TokenStorageService } from "../services/token-storage.service";
import { environment } from "../../environments/environment";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrl: "./courses.component.scss",
})
export class CoursesComponent {
  api_url = environment.apiURL;

  isLoad: boolean = true;
  courseList: any[] = [];

  can_register: boolean = false;

  dialog_show_info_course: boolean = false;
  dialog_show_info_course_data: any = {};

  constructor(
    private coursesService: CoursesService,
    private tokenStorage: TokenStorageService
  ) {
    if (this.tokenStorage.getToken()) {
      let permission = this.tokenStorage.getUser().permission;
      if (permission == 1) {
        this.can_register = true;
      }
    } else {
      this.can_register = false;
    }

    this.loadCourses();
  }

  loadCourses() {
    this.coursesService.getCourseList().subscribe((res) => {
      console.log(res);
      this.courseList = res;
      this.isLoad = false;
    });
  }

  onShowInfoCourseDialog(course: any) {
    this.dialog_show_info_course = true;
    this.dialog_show_info_course_data = course;
  }
}
