import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  aside_items: any[] = [];
  sidebarVisible: boolean = false;

  currentUrl: string = '';
  newUrl: string = '';

  constructor(private router: Router) {}

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
      label: 'เพจ',
      icon: 'pi pi-home',
      expanded: true,
      items: [
        {
          label: 'หน้าแรก',
          icon: 'pi pi-home',
          styleClass: 'select-menu' + (this.router.url == '/' ? ' active' : ''),
          command: () => {
            this.openPage('/');
          },
        },
      ],
    });

    this.aside_items.push({
      label: 'เข้าสู่ระบบ',
      icon: 'pi pi-user',
      expanded: true,
      items: [
        {
          label: 'เข้าสู่ระบบ',
          icon: 'pi pi-sign-in',
          styleClass:
            'select-menu' + (this.router.url == '/login' ? ' active' : ''),
          command: () => {
            this.openPage('/login');
          },
        },
        {
          label: 'สมัครสมาชิก',
          icon: 'pi pi-user-edit',
          styleClass:
            'select-menu' + (this.router.url == '/register' ? ' active' : ''),
          command: () => {
            this.openPage('/register');
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
}
