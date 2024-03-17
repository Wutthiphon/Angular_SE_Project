import { Component } from "@angular/core";
import { CoursesService } from "../../../services/courses.service";
import { TokenStorageService } from "../../../services/token-storage.service";
import { MessageService } from "primeng/api";
import { ConfirmationService } from "primeng/api";
import { Router, ActivatedRoute } from "@angular/router";
import { ImageCroppedEvent } from "ngx-image-cropper";
import { environment } from "../../../../environments/environment";
import Swal from "sweetalert2";

@Component({
  selector: "app-course",
  templateUrl: "./course.component.html",
  styleUrl: "./course.component.scss",
})
export class CourseComponent {
  api_url = environment.apiURL;
  isLoad: boolean = true;
  isApiSaving: boolean = false;

  menu_items: any[] = [
    { label: "ข้อมูลคอร์ส", icon: "pi pi-fw pi-home" },
    { label: "ผู้สมัครในคอร์ส", icon: "pi pi-fw pi-home" },
    { label: "บทเรียน", icon: "pi pi-fw pi-home" },
    { label: "แบบทดสอบ", icon: "pi pi-fw pi-home" },
  ];
  menu_items_active: any = this.menu_items[2];

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

  create_lesson_dialog: boolean = false;
  create_lesson_data = {
    lesson_name: "",
  };

  edit_lesson_dialog: boolean = false;
  edit_lesson_data = {
    lesson_id: <number | null>null,
    lesson_name: "",
  };

  isLoad_lesson: boolean = true;
  lesson_array: any[] = [];

  select_lesson_id: number | null = 0;

  chapter_array = {
    lesson_name: "",
    lesson_chapter: <any>[],
  };

  chapter_data_type: any[] = [
    { label: "วิดีโอ Youtube", value: 1 },
    { label: "เนื้อหา", value: 2 },
  ];

  create_chapter_dialog: boolean = false;
  create_chapter_data = {
    content_name: "",
    content_data: "",
    content_type: null, // 1 = video, 2 = html
  };

  edit_chapter_dialog: boolean = false;
  edit_chapter_data = {
    chapter_id: <number | null>null,
    content_name: "",
    content_data: "",
    content_type: null, // 1 = video, 2 = html
  };

  // Image Crop
  imageCropDialog: boolean = false;
  imageCropData_imageChangedEvent: any = "";
  imageCropData_croppedImage: any = "";
  imageCropData_imageEncode: any = "";
  imageCropData_type: string = "create";

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
    this.coursesService.getCourseByID(Number(course_id)).subscribe(
      (res) => {
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
        this.isLoad = false;

        if (this.menu_items_active == this.menu_items[2]) {
          this.loadLesson();
        }
      },
      (err) => {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: "คุณไม่มีสิทธิ์ในการจัดการคอร์สนี้",
        }).then(() => {
          this.router.navigateByUrl("/my-courses");
        });
      }
    );
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

  loadLesson() {
    this.isLoad_lesson = true;
    this.select_lesson_id = null;
    this.lesson_array = [];

    this.coursesService
      .getCourseLesson(this.select_course_info.course_id)
      .subscribe(
        (res) => {
          this.lesson_array = res.courseLesson;
          this.isLoad_lesson = false;
        },
        (err) => {
          this.isLoad_lesson = false;
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: "ไม่สามารถโหลดข้อมูลบทเรียนได้",
          });
        }
      );
  }

  onCreateLesson() {
    this.create_lesson_dialog = true;
    this.create_lesson_data = {
      lesson_name: "",
    };
  }

  onSubmitCreateLesson() {
    this.isApiSaving = true;
    this.coursesService
      .createLesson(
        this.select_course_info.course_id,
        this.create_lesson_data.lesson_name
      )
      .subscribe(
        (res) => {
          this.messageService.add({
            severity: "success",
            summary: "สำเร็จ",
            detail: "สร้างบทเรียนสำเร็จ",
          });
          this.create_lesson_dialog = false;
          this.create_lesson_data = {
            lesson_name: "",
          };
          this.loadLesson();
          this.isApiSaving = false;
        },
        (err) => {
          this.messageService.add({
            severity: "error",
            summary: "เกิดข้อผิดพลาด",
            detail: err.error.message,
          });
          this.isApiSaving = false;
        }
      );
  }

  onSelectLesson(lesson_id: number) {
    this.isLoad_lesson = true;
    this.select_lesson_id = lesson_id;

    this.coursesService.getCourseLessonChapter(lesson_id).subscribe(
      (res) => {
        this.isLoad_lesson = false;
        this.chapter_array = {
          lesson_name: res.lesson_name,
          lesson_chapter: res.lesson_chapter,
        };
      },
      (err) => {
        this.isLoad_lesson = false;
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถโหลดข้อมูลบทเรียนได้",
        });
      }
    );
  }

  onEditLesson() {
    this.edit_lesson_dialog = true;
    this.edit_lesson_data = {
      lesson_id: this.select_lesson_id,
      lesson_name: this.chapter_array.lesson_name,
    };
  }

  onSubmitEditLesson() {
    this.isApiSaving = true;
    const { lesson_id, lesson_name } = this.edit_lesson_data;

    this.coursesService.editLesson(lesson_id as number, lesson_name).subscribe(
      (res) => {
        this.messageService.add({
          severity: "success",
          summary: "สำเร็จ",
          detail: "แก้ไขชื่อบทเรียนสำเร็จ",
        });
        this.edit_lesson_dialog = false;
        this.edit_lesson_data = {
          lesson_id: null,
          lesson_name: "",
        };
        this.onSelectLesson(this.select_lesson_id as number);
        this.isApiSaving = false;
      },
      (err) => {
        this.messageService.add({
          severity: "error",
          summary: "เกิดข้อผิดพลาด",
          detail: err.error.message,
        });
        this.isApiSaving = false;
      }
    );
  }

  onDeleteLesson() {
    this.confirmationService.confirm({
      header: "ยืนยัน",
      icon: "pi pi-exclamation-triangle",
      message: "ยืนยันการลบบทเรียน",
      accept: () => {
        this.coursesService
          .deleteLesson(this.select_lesson_id as number)
          .subscribe(
            (res) => {
              this.messageService.add({
                severity: "success",
                summary: "สำเร็จ",
                detail: "ลบบทเรียนสำเร็จ",
              });
              this.loadLesson();
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

  onBackToLesson() {
    this.select_lesson_id = null;
    this.loadLesson();
  }

  onAddContent() {
    this.create_chapter_dialog = true;
    this.create_chapter_data = {
      content_name: "",
      content_data: "",
      content_type: null,
    };
  }

  onSubmitAddContent() {
    this.isApiSaving = true;
    const { content_name, content_data, content_type } =
      this.create_chapter_data;
    if (content_type == null || content_name == "" || content_data == "") {
      this.messageService.add({
        severity: "error",
        summary: "เกิดข้อผิดพลาด",
        detail: "กรุณากรอกข้อมูลให้ครบถ้วน",
      });
      return;
    }

    this.coursesService
      .createCourseLessonChapter(
        this.select_lesson_id as number,
        content_name,
        content_data,
        content_type
      )
      .subscribe(
        (res) => {
          this.messageService.add({
            severity: "success",
            summary: "สำเร็จ",
            detail: "เพิ่มบทเรียนสำเร็จ",
          });
          this.isApiSaving = false;
          this.create_chapter_dialog = false;
          this.create_chapter_data = {
            content_name: "",
            content_data: "",
            content_type: null,
          };
          this.onSelectLesson(this.select_lesson_id as number);
        },
        (err) => {
          this.messageService.add({
            severity: "error",
            summary: "เกิดข้อผิดพลาด",
            detail: err.error.message,
          });
          this.isApiSaving = false;
        }
      );
  }

  // Page Control
  onActiveItemChange(event: any) {
    this.menu_items_active = event;

    if (this.menu_items_active == this.menu_items[2]) {
      this.loadLesson();
    }
  }
}
