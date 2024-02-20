import { Component } from "@angular/core";
import { CoursesService } from "../services/courses.service";
import { TokenStorageService } from "../services/token-storage.service";
@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrl: "./courses.component.scss",
})
export class CoursesComponent {
  isLoad: boolean = true;
  courseList: any[] = [];

  can_register: boolean = false;

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
}
