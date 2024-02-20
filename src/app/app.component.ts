import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TokenStorageService } from "./services/token-storage.service";

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
      label: "ออกจากระบบ",
      icon: "pi pi-sign-out",
      command: () => {
        this.logout();
      },
    },
  ];

  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService
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
