import { Component } from "@angular/core";
import { AccountService } from "../../services/account.service";
import { ConfirmationService } from "primeng/api";
import { MessageService } from "primeng/api";
import Swal from "sweetalert2";
import { ImageCroppedEvent } from "ngx-image-cropper";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrl: "./profile.component.scss",
})
export class ProfileComponent {
  env = environment;
  gender_arr: any[] = [
    { label: "ไม่ระบุ", value: null },
    { label: "ชาย", value: "ชาย" },
    { label: "หญิง", value: "หญิง" },
  ];

  profile_form = {
    username: "",
    prefix: "",
    firstname: "",
    lastname: "",
    email: "",
    gender: "",
  };

  isApiSaving: boolean = false;

  profile_image: string = "";

  imageCropDialog: boolean = false;
  imageCropData_imageChangedEvent: any = "";
  imageCropData_croppedImage: any = "";
  imageCropData_imageEncode: any = "";

  constructor(
    private accountService: AccountService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.loadProfile();
  }
  // Profile Image
  selectProfileImage(event: any) {
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

  uploadProfileImage() {
    this.accountService
      .updateProfileImage(this.imageCropData_imageEncode)
      .subscribe((res) => {
        this.messageService.add({
          severity: "success",
          summary: "สำเร็จ",
          detail: "แก้ไขภาพโปรไฟล์แล้ว",
        });
        this.loadProfile();
      });
    this.imageCropDialog = false;
  }

  // profile Data
  loadProfile() {
    this.accountService.getProfile().subscribe((res) => {
      if (res) {
        this.profile_image = res.image;
        this.profile_form = {
          username: res.username,
          prefix: res.prefix,
          firstname: res.first_name,
          lastname: res.last_name,
          email: res.email,
          gender: res.gender,
        };
      } else {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถโหลดข้อมูลโปรไฟล์ได้",
        });
      }
    });
  }

  updateProfile() {
    const { prefix, firstname, lastname, email, gender } = this.profile_form;
    this.isApiSaving = true;
    this.accountService
      .updateProfile(prefix, firstname, lastname, email, gender)
      .subscribe((res) => {
        if (res) {
          this.messageService.add({
            severity: "success",
            summary: "แก้ไขข้อมูลโปรไฟล์สำเร็จ",
            detail: "ข้อมูลโปรไฟล์ของคุณได้รับการแก้ไขเรียบร้อยแล้ว",
          });
        } else {
          this.messageService.add({
            severity: "error",
            summary: "เกิดข้อผิดพลาด",
            detail: "ไม่สามารถแก้ไขข้อมูลโปรไฟล์ได้",
          });
        }
        this.isApiSaving = false;
      });
  }
}
