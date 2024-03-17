import { Component } from "@angular/core";
import { CoursesService } from "../../../services/courses.service";
import { TokenStorageService } from "../../../services/token-storage.service";
import { MessageService } from "primeng/api";
import { ConfirmationService } from "primeng/api";
import { Router, ActivatedRoute } from "@angular/router";
import { ImageCroppedEvent } from "ngx-image-cropper";
import { environment } from "../../../../environments/environment";

@Component({
  selector: "app-course",
  templateUrl: "./course.component.html",
  styleUrl: "./course.component.scss",
})
export class CourseComponent {
  api_url = environment.apiURL;
  isLoad: boolean = true;

  menu_items: any[] = [
    { label: "ข้อมูลคอร์ส", icon: "pi pi-fw pi-home" },
    { label: "ผู้สมัครในคอร์ส", icon: "pi pi-fw pi-home" },
    { label: "บทเรียน", icon: "pi pi-fw pi-home" },
    { label: "แบบทดสอบ", icon: "pi pi-fw pi-home" },
  ];
  menu_items_active: any = this.menu_items[0];

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

  select_course: any = {};
  select_course_info = {
    course_id: 0,
    course_name: "",
    course_description: "",
    course_have_price: false,
    cover_image: "./assets/cover/null-cover.png",
    payment_image: "./assets/cover/null-cover.png",
    course_price: null,
    register_user: [],
  };
  view_receipt_dialog: boolean = false;
  view_receipt_dialog_img: any | null = null;

  reject_comment_dialog: boolean = false;
  reject_comment_reg_id: number = 0;
  reject_comment: string = "";

  constructor(
    private coursesService: CoursesService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    if (this.tokenStorage.getToken()) {
      let permission = this.tokenStorage.getUser().permission;
      if (permission != 2 && permission != 3) {
        this.router.navigateByUrl("/login");
      } else {
        this.loadCourses();
      }
    } else {
      this.router.navigateByUrl("/login");
      return;
    }
  }

  loadCourses() {
    // get param course_id
    let course_id = this.route.snapshot.paramMap.get("id");
    this.coursesService.getCourseByID(Number(course_id)).subscribe((res) => {
      this.select_course_info = {
        course_id: res.course_id,
        course_name: res.course_name,
        course_description: res.course_description,
        course_have_price: res.course_visibility,
        course_price: res.cost,
        cover_image: res.image,
        payment_image: res.img_account,
        register_user: res.course_reg,
      };
    });
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
          if (this.imageCropData_type == "edit") {
            this.select_course_info.cover_image = api_res.image;
          } else if (this.imageCropData_type == "payment_edit") {
            this.select_course_info.payment_image = api_res.image;
          }
        }
      });
    this.imageCropDialog = false;
  }

  editCourseSubmit() {
    this.confirmationService.confirm({
      icon: "pi pi-exclamation-triangle",
      header: "ยืนยัน",
      message: "ยืนยันการแก้ไขคอร์ส",
      accept: () => {
        const {
          course_id,
          course_name,
          course_description,
          course_have_price,
          cover_image,
          course_price,
          payment_image,
        } = this.select_course_info;
        this.coursesService
          .updateCourse(
            course_id,
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
                  detail: "แก้ไขคอร์สสำเร็จ",
                });
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

  openReceiptDialog(transfer_document: any) {
    this.view_receipt_dialog = true;
    this.view_receipt_dialog_img = transfer_document;
  }

  onApproveRegisterCourse(reg_id: number) {
    this.confirmationService.confirm({
      header: "ยืนยัน",
      icon: "pi pi-exclamation-triangle",
      message: "ยืนยันการอนุมัติการลงทะเบียน",
      accept: () => {
        this.coursesService.teacherApproveStudentRegistration(reg_id).subscribe(
          (res) => {
            this.messageService.add({
              severity: "success",
              summary: "สำเร็จ",
              detail: "อนุมัติการลงทะเบียนสำเร็จ",
            });
            // this.getCourseByID(this.select_course);
          },
          (err) => {
            this.messageService.add({
              severity: "error",
              summary: "เกิดข้อผิดพลาด",
              detail: err.error.message,
            });
          }
        );
      },
    });
  }

  onRejectRegisterCourse(reg_id: number) {
    this.reject_comment_dialog = true;
    this.reject_comment_reg_id = reg_id;
    this.reject_comment = "";
  }

  onRejectRegisterCourseSubmit() {
    this.confirmationService.confirm({
      header: "ยืนยัน",
      icon: "pi pi-exclamation-triangle",
      message: "ยืนยันการปฏิเสธการลงทะเบียน",
      accept: () => {
        this.coursesService
          .teacherRejectStudentRegistration(
            this.reject_comment_reg_id,
            this.reject_comment
          )
          .subscribe(
            (res) => {
              this.messageService.add({
                severity: "success",
                summary: "สำเร็จ",
                detail: "ปฏิเสธการลงทะเบียนสำเร็จ",
              });
              this.reject_comment_dialog = false;
              this.reject_comment_reg_id = 0;
              this.reject_comment = "";
              // this.getCourseByID(this.select_course);
            },
            (err) => {
              this.messageService.add({
                severity: "error",
                summary: "เกิดข้อผิดพลาด",
                detail: err.error.message,
              });
            }
          );
      },
    });
  }

  // Page Control
  onActiveItemChange(event: any) {
    this.menu_items_active = event;
  }
}
