import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { LayoutConfig } from '../../interfaces/ILayoutConfig.interface';
import { LayoutService } from '../../services/layout.service';
import { TablerIconsModule } from 'angular-tabler-icons';
import { RouterModule } from '@angular/router';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { NotificationService } from '../../services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { INavbarNotification } from '../../interfaces/INavbarNotification.interface';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TablerIconsModule,
    ClickOutsideDirective
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  layoutService: LayoutService = inject(LayoutService);
  notificationService: NotificationService = inject(NotificationService);
  configS: LayoutConfig = this.layoutService.configS();
  notificationsClicked: boolean = false;
  notificationList: INavbarNotification[] = [];
  notificationsUnread: number = 0;
  avatarClicked: boolean = false;
  currentUser: any = null;
  loading: boolean = false;

  ngOnInit(): void {
    if (this.configS.darkMode) {
      document.body.classList.toggle('dark');
    }

    this.getNotifications();
    this.getUserInfo();
  }

  onToggleSidebar(): void {
    this.configS.sidebar.opened = !this.configS.sidebar.opened;
    this.layoutService.persistConfig(this.configS);
  }

  onToggleDarkMode(): void {
    document.body.classList.toggle('dark');
    this.configS.darkMode = !this.configS.darkMode;
    this.layoutService.persistConfig(this.configS);
  }

  getNotifications(): void {
    this.loading = true;
    this.notificationService.fetchAll().subscribe({
      next: (res) => {
        this.loading = false;
        this.notificationList = res.data;
        this.notificationsUnread = this.notificationList.filter(n => !n.read).length;
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        console.error({ err });
      }
    });
  }

  getCurrentNotifications(): string {
    return this.notificationsUnread > 0 && this.notificationsUnread < 10 ? this.notificationsUnread.toString() : '9+';
  }

  onNotificationsClicked(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.avatarClicked = false;
    this.notificationsClicked = !this.notificationsClicked;
  }

  markNotificationAsRead(noti: INavbarNotification): void {
    if (noti.read) {
      return;
    }

    noti.read = true;
    this.notificationsUnread = this.notificationList.filter(n => !n.read).length;
    this.loading = true;
    this.notificationService.markAsRead(noti.id, noti).subscribe({
      next: (res) => {
        this.loading = false;
        this.getNotifications();
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        console.error({ err });
        noti.read = false;
        this.notificationsUnread = this.notificationList.filter(n => !n.read).length;
      }
    });
  }

  getUserInfo() {
    this.currentUser = {
      username: 'Edinson M. Ch.',
      role: 'Admin',
      // avatar: 'https://picsum.photos/32/32'
    };
  }

  onUserAvatarClicked(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.notificationsClicked = false;
    this.avatarClicked = !this.avatarClicked;
  }
}
