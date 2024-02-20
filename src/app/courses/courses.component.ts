import { Component } from "@angular/core";
import { CoursesService } from "../services/courses.service";
@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrl: "./courses.component.scss",
})
export class CoursesComponent {
  isLoad: boolean = true;
  courseList: any[] = [];

  constructor(private coursesService: CoursesService) {
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
