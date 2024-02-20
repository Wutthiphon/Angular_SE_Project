import { Component } from "@angular/core";
import { MessageService, ConfirmationService } from "primeng/api";
import { AuthService } from "../../services/auth.service";
import { TokenStorageService } from "../../services/token-storage.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.scss",
  providers: [MessageService, ConfirmationService],
})
export class RegisterComponent {
  prefix_arr: any[] = [
    { label: "นาย", value: "นาย" },
    { label: "นาง", value: "นาง" },
    { label: "นางสาว", value: "นางสาว" },
  ];

  gender_arr: any[] = [
    { label: "ไม่ระบุ", value: null },
    { label: "ชาย", value: "ชาย" },
    { label: "หญิง", value: "หญิง" },
  ];

  permission_arr: any[] = [
    { label: "นักเรียน", value: 1 },
    { label: "ผู้สอน", value: 2 },
  ];

  register_form: {
    username: string;
    password: string;
    password_confirm: string;
    email: string;
    prefix: string | null;
    firstname: string;
    lastname: string;
    gender: string | null;
    permission_id: number | null;
  } = {
    username: "",
    password: "",
    password_confirm: "",
    email: "",
    prefix: null,
    firstname: "",
    lastname: "",
    gender: null,
    permission_id: 1,
  };

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private tokenStorage: TokenStorageService,
    private authService: AuthService
  ) {}

  registerSubmit() {
    const {
      username,
      password,
      password_confirm,
      email,
      prefix,
      firstname,
      lastname,
      gender,
      permission_id,
    } = this.register_form;

    if (
      username &&
      password &&
      password_confirm &&
      email &&
      prefix &&
      firstname &&
      lastname &&
      permission_id
    ) {
      if (password.length < 8 || password_confirm.length < 8) {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "รหัสผ่านต้องมากกว่า 8 ตัวอักษร",
        });
        return;
      }
      if (password != password_confirm) {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "รหัสผ่านไม่ตรงกัน",
        });
        return;
      }

      this.confirmationService.confirm({
        message: "ยืนยันการสมัครสมาชิก?",
        accept: () => {
          this.authService
            .register(
              username,
              password,
              password_confirm,
              email,
              prefix,
              firstname,
              lastname,
              gender ? gender : "ไม่ระบุ",
              permission_id
            )
            .subscribe(
              (res) => {
                Swal.fire({
                  icon: "success",
                  title: "สมัครสมาชิกสำเร็จ",
                  text: "ระบบจะทำการเข้าสู้ระบบ",
                }).then(() => {
                  // Save Token
                });
              },
              (err) => {
                Swal.fire({
                  icon: "error",
                  title: "เกิดข้อผิดพลาด",
                  text: err.error.message,
                });
              }
            );
        },
        reject: () => {},
      });
    } else {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "กรุณากรอกข้อมูลให้ครบถ้วน",
      });
    }
  }
}
