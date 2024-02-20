import { Component } from "@angular/core";
import { CoursesService } from "../../services/courses.service";
import { TokenStorageService } from "../../services/token-storage.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-my-courses",
  templateUrl: "./my-courses.component.html",
  styleUrl: "./my-courses.component.scss",
})
export class MyCoursesComponent {
  isLoad: boolean = true;
  courseList: any[] = [];

  can_create: boolean = false;

  constructor(
    private coursesService: CoursesService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {
    if (this.tokenStorage.getToken()) {
      let permission = this.tokenStorage.getUser().permission;
      switch (permission) {
        case 1:
          // Student
          this.can_create = false;
          break;
        case 2:
          // Teacher
          this.can_create = true;
          break;
        default:
          this.router.navigateByUrl("/login");
          break;
      }
    } else {
      this.router.navigateByUrl("/login");
    }

    this.loadCourses();
  }

  loadCourses() {
    this.coursesService.getMyCourse().subscribe((res) => {
      this.courseList = res;
      this.isLoad = false;
    });
  }

  createCourse() {}
}
