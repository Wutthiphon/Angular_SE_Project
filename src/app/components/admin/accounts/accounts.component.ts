import { Component } from "@angular/core";
import { TokenStorageService } from "../../../services/token-storage.service";
import { AccountService } from "../../../services/account.service";
import { MessageService } from "primeng/api";
import { ConfirmationService } from "primeng/api";
import { Router, ActivatedRoute } from "@angular/router";
import { environment } from "../../../../environments/environment";
import Swal from "sweetalert2";

@Component({
  selector: "app-accounts",
  templateUrl: "./accounts.component.html",
  styleUrl: "./accounts.component.scss",
})
export class AccountsComponent {
  api_url = environment.apiURL;
  my_user_id: number = 0;
  isLoad: boolean = true;

  accounts: any[] = [];

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

  add_dialog: boolean = false;
  add_dialog_data = {
    username: "",
    prefix: <string | null>null,
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    password: "",
  };

  edit_dialog: boolean = false;
  edit_dialog_data = {
    user_id: null,
    username: "",
    prefix: "",
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
  };

  resetPasswordDialog: boolean = false;
  resetPasswordDialog_data: any = {
    user_id: null,
    mode: "reset_email",
    password: "",
  };

  constructor(
    private tokenStorage: TokenStorageService,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    if (this.tokenStorage.getToken()) {
      this.my_user_id = this.tokenStorage.getUser().id;
      let permission = this.tokenStorage.getUser().permission;
      if (permission != 3) {
        this.router.navigateByUrl("/login");
      } else {
        this.loadAccounts();
      }
    } else {
      this.router.navigateByUrl("/login");
      return;
    }
  }

  loadAccounts() {
    this.isLoad = true;
    this.accountService.adminGetAccounts().subscribe((res) => {
      this.isLoad = false;
      this.accounts = res;
    });
  }

  addAccountSubmit() {
    const { username, prefix, first_name, last_name, email, gender, password } =
      this.add_dialog_data;

    if (!/^[A-Za-z0-9]+$/.test(username)) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail:
          "ชื่อผู้ใช้ต้องเป็นภาษาอังกฤษและตัวเลข โดยไม่มีช่องว่าง เท่านั้น",
      });
      return;
    }

    if (password.length < 8) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "รหัสผ่านต้องมากกว่า 8 ตัวอักษร",
      });
      return;
    }

    if (username && prefix && first_name && last_name && password) {
      this.accountService
        .adminAddAccount(
          username,
          prefix,
          first_name,
          last_name,
          email,
          gender,
          password
        )
        .subscribe(
          (res) => {
            this.messageService.add({
              severity: "success",
              summary: "เพิ่มบัญชีสำเร็จ",
              detail: "เพิ่มบัญชีสำเร็จ",
            });
            this.add_dialog = false;
            this.loadAccounts();
          },
          (err) => {
            this.messageService.add({
              severity: "error",
              summary: "เพิ่มบัญชีไม่สำเร็จ",
              detail: err.error.message,
            });
          }
        );
    } else {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "กรุณากรอกข้อมูลให้ครบถ้วน",
      });
      return;
    }
  }

  editAccount(account: any) {
    this.edit_dialog_data.user_id = account.user_id;
    this.edit_dialog_data.username = account.username;
    this.edit_dialog_data.prefix = account.prefix;
    this.edit_dialog_data.first_name = account.first_name;
    this.edit_dialog_data.last_name = account.last_name;
    this.edit_dialog_data.email = account.email;
    this.edit_dialog_data.gender = account.gender;

    this.edit_dialog = true;
  }

  editAccountSubmit() {
    const { user_id, prefix, first_name, last_name, email, gender } =
      this.edit_dialog_data;
    this.accountService
      .updateUserInfo(user_id, prefix, first_name, last_name, email, gender)
      .subscribe(
        (res) => {
          this.messageService.add({
            severity: "success",
            summary: "แก้ไขข้อมูลสำเร็จ",
            detail: "แก้ไขข้อมูลสำเร็จ",
          });
          this.edit_dialog = false;
          this.loadAccounts();
        },
        (err) => {
          this.messageService.add({
            severity: "error",
            summary: "แก้ไขข้อมูลไม่สำเร็จ",
            detail: err.error.message,
          });
        }
      );
  }

  deleteAccount(account: any) {
    this.confirmationService.confirm({
      message: "คุณต้องการลบบัญชีนี้ใช่หรือไม่ ?",
      header: "ยืนยันการลบบัญชี",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.accountService.deleteUser(account.user_id).subscribe((res) => {
          this.messageService.add({
            severity: "success",
            summary: "ลบบัญชีสำเร็จ",
            detail: "ลบบัญชีสำเร็จ",
          });
          this.loadAccounts();
        });
      },
    });
  }

  resetPassword(user_id: number) {
    this.resetPasswordDialog = true;
    this.resetPasswordDialog_data.user_id = user_id;
    this.resetPasswordDialog_data.mode = "reset_email";
    this.resetPasswordDialog_data.password = "";
  }

  resetPasswordSubmit() {
    if (this.resetPasswordDialog_data.mode) {
      if (this.resetPasswordDialog_data.mode == "reset_email") {
        this.confirmationService.confirm({
          message: "เมื่อ Reset แล้วรหัสผ่านจะเป็นหมายเลขเอกสารระบุตัวตน",
          header: "ยืนยันการรีเซ็ตรหัสผ่าน ?",
          icon: "pi pi-exclamation-triangle",
          accept: () => {
            // this.accountService
            //   .reset_password_email(this.resetPasswordDialog_data.user_id)
            //   .subscribe((api_res) => {
            //     if (api_res.status == true) {
            //       this.resetPasswordDialog = false;
            //       this.resetPasswordDialog_data.user_id = "";
            //       this.resetPasswordDialog_data.mode = "reset_email";
            //       this.resetPasswordDialog_data.password = "";
            //       this.resetPasswordDialog_data.email = "";
            //       this.messageService.add({
            //         severity: "success",
            //         summary: "สำเร็จ!",
            //         detail: api_res.message,
            //       });
            //     } else {
            //       this.messageService.add({
            //         severity: "error",
            //         summary: "ข้อผิดพลาด!",
            //         detail: api_res.message,
            //       });
            //     }
            //   });
          },
        });
      } else if (this.resetPasswordDialog_data.mode == "reset_set_password") {
        this.confirmationService.confirm({
          message: "รหัสจะถูกเปลี่ยนเป็นตามที่ระบุ",
          header: "ยืนยันการรีเซ็ตรหัสผ่าน ?",
          icon: "pi pi-exclamation-triangle",
          accept: () => {
            // this.accountService
            //   .reset_password_set(
            //     this.resetPasswordDialog_data.user_id,
            //     this.resetPasswordDialog_data.password
            //   )
            //   .subscribe((api_res) => {
            //     if (api_res.status == true) {
            //       this.resetPasswordDialog = false;
            //       this.resetPasswordDialog_data.user_id = "";
            //       this.resetPasswordDialog_data.mode = "reset_email";
            //       this.resetPasswordDialog_data.password = "";
            //       this.resetPasswordDialog_data.email = "";
            //       this.messageService.add({
            //         severity: "success",
            //         summary: "สำเร็จ!",
            //         detail: api_res.message,
            //       });
            //     } else {
            //       this.messageService.add({
            //         severity: "error",
            //         summary: "ข้อผิดพลาด!",
            //         detail: api_res.message,
            //       });
            //     }
            //   });
          },
        });
      }
    }
  }
}
