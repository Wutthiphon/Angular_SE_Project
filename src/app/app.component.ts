import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TokenStorageService } from "./services/token-storage.service";
import { AccountService } from "./services/account.service";
import { MessageService } from "primeng/api";
import { ConfirmationService } from "primeng/api";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
  aside_items: any[] = [];
  sidebarVisible: boolean = false;

  currentUrl: string = "";
  newUrl: string = "";

  isLogin: boolean = false;
  permission_id: number = 0;

  web_name = "";
  profile_menu_item: any[] = [
    {
      label: "โปรไฟล์",
      icon: "pi pi-user",
      command: () => {
        this.openPage("/profile");
      },
    },
    {
      label: "เปลี่ยนรหัสผ่าน",
      icon: "pi pi-key",
      command: () => {
        this.change_password_dialog = true;
      },
    },
    {
      separator: true,
    },
    {
      label: "ออกจากระบบ",
      icon: "pi pi-sign-out",
      command: () => {
        this.logout();
      },
    },
  ];

  change_password_dialog: boolean = false;
  change_password_dialog_data = {
    old_password: "",
    new_password: "",
    re_password: "",
  };

  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private accountService: AccountService
  ) {
    if (this.tokenStorage.getToken()) {
      let permission = this.tokenStorage.getUser().permission;
      if (permission) {
        this.permission_id = permission;
        this.isLogin = true;

        let permission_text = "";
        switch (this.permission_id) {
          case 1:
            permission_text = "(นักเรียน) ";
            break;
          case 2:
            permission_text = "(ผู้สอน) ";
            break;
          case 3:
            permission_text = "(ผู้ดูแลระบบ) ";
            break;
        }
        this.web_name = permission_text + this.tokenStorage.getUser().name;
      }
    } else {
      this.permission_id = 0;
      this.isLogin = false;
    }
  }

  ngOnInit() {
    // Aside Menu
    this.router.events.subscribe(async () => {
      this.newUrl = this.router.url;

      if (this.newUrl != this.currentUrl) {
        this.loadMenu();
        // Update Current URL
        this.currentUrl = this.newUrl;
      }
    });
  }

  // Init Menu
  loadMenu() {
    this.aside_items = [];

    this.aside_items.push({
      label: "เพจ",
      icon: "pi pi-home",
      expanded: true,
      items: [
        {
          label: "หน้าแรก",
          icon: "pi pi-home",
          styleClass: "select-menu" + (this.router.url == "/" ? " active" : ""),
          command: () => {
            this.openPage("/");
          },
        },
      ],
    });

    this.aside_items.push({
      label: "เข้าสู่ระบบ",
      icon: "pi pi-user",
      expanded: true,
      items: [
        {
          label: "เข้าสู่ระบบ",
          icon: "pi pi-sign-in",
          styleClass:
            "select-menu" + (this.router.url == "/login" ? " active" : ""),
          command: () => {
            this.openPage("/login");
          },
        },
        {
          label: "สมัครสมาชิก",
          icon: "pi pi-user-edit",
          styleClass:
            "select-menu" + (this.router.url == "/register" ? " active" : ""),
          command: () => {
            this.openPage("/register");
          },
        },
      ],
    });
  }

  // Change Password
  onSubmitChangePassword() {
    const { old_password, new_password, re_password } =
      this.change_password_dialog_data;

    if (new_password != re_password) {
      this.messageService.add({
        severity: "error",
        summary: "เกิดข้อผิดพลาด",
        detail: "รหัสผ่านใหม่ไม่ตรงกัน",
      });
      return;
    }

    this.confirmationService.confirm({
      message: "ยืนยันการเปลี่ยนรหัสผ่าน?",
      accept: () => {
        this.accountService
          .changePassword(old_password, new_password)
          .subscribe(
            (res) => {
              this.messageService.add({
                severity: "success",
                summary: "สำเร็จ",
                detail: "เปลี่ยนรหัสผ่านสำเร็จ",
              });
              this.change_password_dialog = false;
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
  toggleAside() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  openPage(url: string) {
    this.sidebarVisible = false;
    this.router.navigateByUrl(url);
  }

  logout() {
    this.tokenStorage.signOut();
    // this.router.navigateByUrl("/");
    window.location.reload();
  }
}
