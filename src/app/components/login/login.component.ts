import { Component } from "@angular/core";
import { MessageService, ConfirmationService } from "primeng/api";
import { AuthService } from "../../services/auth.service";
import { TokenStorageService } from "../../services/token-storage.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  login_form: {
    username: string;
    password: string;
    remenber_me: boolean;
  } = {
    username: "",
    password: "",
    remenber_me: false,
  };

  is_error: boolean = false;
  is_load: boolean = false;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private tokenStorage: TokenStorageService,
    private authService: AuthService,
    private router: Router
  ) {
    if (localStorage.getItem("remenber_me")) {
      this.login_form.username = localStorage.getItem("username") || "";
      this.login_form.password = localStorage.getItem("password") || "";
      this.login_form.remenber_me = true;
    }
    this.CheckisLogin();
  }

  CheckisLogin() {
    if (this.tokenStorage.getToken()) {
      let permission = this.tokenStorage.getUser().permission;
      if (!permission) {
        Swal.fire(
          "ข้อผิดพลาด!",
          "ไม่พบสิทธิ์การใช้งานใด ๆ ในบัญชีของคุณกรุณาติดต่อผู้ดูแลระบบ",
          "error"
        );
        this.tokenStorage.signOut();
      } else {
        this.router.navigateByUrl("/");
      }
    }
  }

  loginSubmit() {
    this.is_error = false;
    this.is_load = true;
    const { username, password, remenber_me } = this.login_form;
    if (username && password) {
      this.authService.login(username, password).subscribe(
        (res) => {
          // if login Success
          this.is_error = false;
          this.tokenStorage.saveToken(res.accessToken);
          this.tokenStorage.saveUser(res);
          // Save Remember Me
          if (remenber_me) {
            localStorage.setItem("remenber_me", "checked");
            localStorage.setItem("username", username);
            localStorage.setItem("password", password);
          } else {
            window.localStorage.removeItem("remenber_me");
            window.localStorage.removeItem("username");
            window.localStorage.removeItem("password");
          }
          this.CheckisLogin();
          this.is_load = false;
          window.location.reload();
        },
        (error) => {
          this.is_error = true;
          this.messageService.add({
            severity: "error",
            summary: "ข้อผิดพลาด",
            detail: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
          });
          this.is_load = false;
        }
      );
    } else {
      this.is_error = true;
      this.messageService.add({
        severity: "error",
        summary: "ข้อผิดพลาด",
        detail: "กรุณากรอกข้อมูลให้ครบถ้วน",
      });
    }
  }
}
