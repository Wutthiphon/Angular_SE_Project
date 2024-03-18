import { Component } from "@angular/core";
import { CoursesService } from "../../services/courses.service";
import { TokenStorageService } from "../../services/token-storage.service";
import { MessageService } from "primeng/api";
import { ConfirmationService } from "primeng/api";
import { Router } from "@angular/router";
import { ImageCroppedEvent } from "ngx-image-cropper";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-my-courses",
  templateUrl: "./my-courses.component.html",
  styleUrl: "./my-courses.component.scss",
})
export class MyCoursesComponent {
  api_url = environment.apiURL;
  isLoad: boolean = true;
  courseList: any[] = [];

  can_create: boolean = false;

  imageCropDialog: boolean = false;
  imageCropData_imageChangedEvent: any = "";
  imageCropData_croppedImage: any = "";
  imageCropData_imageEncode: any = "";
  imageCropData_type: string = "create";

  create_course_dialog: boolean = false;
  create_course_dialog_data = {
    course_name: "",
    course_description: "",
    course_have_price: false,
    cover_image: "./assets/cover/null-cover.png",
    payment_image: "./assets/cover/null-cover.png",
    course_price: null,
  };

  page: string = "my-courses"; // my-courses in-course
  select_course: any = {};

  menu_items: any[] = [
    { label: "บทเรียน", icon: "pi pi-fw pi-home" },
    { label: "แบบทดสอบ", icon: "pi pi-fw pi-home" },
  ];
  menu_items_active: any = this.menu_items[0];

  // Student
  student_course_content: any = {};
  isLoad_student_content: boolean = true;

  constructor(
    private coursesService: CoursesService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
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
      this.loadCourses();
    } else {
      this.router.navigateByUrl("/login");
      return;
    }
  }

  loadCourses() {
    this.coursesService.getMyCourse().subscribe((res) => {
      this.courseList = res;
      this.isLoad = false;
    });
  }

  getCourseByID(couse: any) {
    this.isLoad_student_content = true;
    this.coursesService.getCourseContent(couse.course_id).subscribe(
      (res) => {
        this.student_course_content = res;
        this.isLoad_student_content = false;
        console.log(res);
      },
      (err) => {
        this.messageService.add({
          severity: "error",
          summary: "เกิดข้อผิดพลาด",
          detail: err.error.message,
        });
      }
    );
  }

  onOpenCourse(course: any) {
    this.select_course = course;
    this.goPage("in-course");
    this.getCourseByID(this.select_course);
  }

  // Teacher
  createCourse() {
    this.create_course_dialog = true;
    this.create_course_dialog_data = {
      course_name: "",
      course_description: "",
      course_have_price: false,
      cover_image: "./assets/cover/null-cover.png",
      payment_image: "./assets/cover/null-cover.png",
      course_price: null,
    };
  }

  selectCoverImage(event: any, type: string) {
    this.imageCropData_type = type;
    this.imageCropData_croppedImage = "";
    this.imageCropData_imageEncode = "";
    this.imageCropData_imageChangedEvent = event;
    if (event && event.target.files.length > 0) {
      this.imageCropDialog = true;
    }
  }

  imageCropped(event: ImageCroppedEvent) {
    this.imageCropData_croppedImage = event.base64;
    this.imageCropData_imageEncode = this.base64ToFile(
      event.base64,
      this.imageCropData_imageChangedEvent.target.files[0].name
    );
    {
      {
      }
    }
  }

  imageLoaded() {
    /* show cropper */
  }
  cropperReady() {
    /* cropper ready */
  }
  loadImageFailed() {
    /* show message */
  }

  base64ToFile(data: any, filename: any) {
    const arr = data.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  uploadCoverImage() {
    this.coursesService
      .update_course_image(this.imageCropData_imageEncode)
      .subscribe((api_res) => {
        if (api_res.status == true) {
          this.messageService.add({
            severity: "success",
            summary: "สำเร็จ",
            detail: "Upload รูปภาพสำเร็จ",
          });
          if (this.imageCropData_type == "create") {
            this.create_course_dialog_data.cover_image = api_res.image;
          } else if (this.imageCropData_type == "payment") {
            this.create_course_dialog_data.payment_image = api_res.image;
          }
        }
      });
    this.imageCropDialog = false;
  }

  createCourseSubmit() {
    const {
      course_name,
      course_description,
      course_have_price,
      cover_image,
      course_price,
      payment_image,
    } = this.create_course_dialog_data;

    if (payment_image == "./assets/cover/null-cover.png") {
      this.messageService.add({
        severity: "error",
        summary: "เกิดข้อผิดพลาด",
        detail: "กรุณาเลือกรูปภาพวิธีการชำระเงิน",
      });
      return;
    }

    this.confirmationService.confirm({
      icon: "pi pi-exclamation-triangle",
      header: "ยืนยัน",
      message: "ยืนยันการสร้างคอร์ส",
      accept: () => {
        this.coursesService
          .createCourse(
            course_name,
            course_description,
            course_have_price,
            cover_image == "./assets/cover/null-cover.png" ? null : cover_image,
            course_price,
            payment_image
          )
          .subscribe(
            (api_res) => {
              if (api_res.status == true) {
                this.messageService.add({
                  severity: "success",
                  summary: "สำเร็จ",
                  detail: "Succes",
                });
                this.create_course_dialog = false;
                this.loadCourses();
              }
            },
            (error) => {
              this.messageService.add({
                severity: "error",
                summary: "เกิดข้อผิดพลาด",
                detail: error.error.message,
              });
            }
          );
      },
    });
  }

  // Student
  onOpenLesson(item: any) {
    console.log(item);
  }

  // Page Control
  goPage(page: string) {
    this.page = page;
  }

  onActiveItemChange(event: any) {
    this.menu_items_active = event;
  }
}
