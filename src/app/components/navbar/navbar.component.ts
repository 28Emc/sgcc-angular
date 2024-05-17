import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { LayoutConfig } from '../../interfaces/ILayoutConfig.interface';
import { LayoutService } from '../../services/layout.service';
import { TablerIconsModule } from 'angular-tabler-icons';
import { RouterModule } from '@angular/router';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';

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
  configS: LayoutConfig = this.layoutService.configS();
  notificationsClicked: boolean = false;
  notificationList: any[] = [];
  notificationsUnread: number = 0;
  avatarClicked: boolean = false;
  currentUser: any = null;

  ngOnInit(): void {
    if (this.configS.darkMode) {
      document.body.classList.toggle('dark');
    }

    this.getNotifications();
    this.getUserInfo();
  }

  onToggleSidebar(): void {
    this.configS.sidebar.collapsed = !this.configS.sidebar.collapsed;
    this.layoutService.persistConfig(this.configS);
  }

  onToggleDarkMode(): void {
    document.body.classList.toggle('dark');
    this.configS.darkMode = !this.configS.darkMode;
    this.layoutService.persistConfig(this.configS);
  }

  getNotifications(): void {
    this.notificationList = [
      { id: 1, type: 'success', icon: 'circle-check', title: 'Notification 1', description: 'This is a success notification type text description. For testing purposes.', read: false },
      { id: 2, type: 'info', icon: 'info-circle', title: 'Notification 2', description: 'This is a info notification type text description. For testing purposes.', read: false },
      { id: 3, type: 'warning', icon: 'alert-triangle', title: 'Notification 3', description: 'This is a danger notification type text description. For testing purposes.', read: false },
      { id: 4, type: 'error', icon: 'exclamation-circle', title: 'Notification 4', description: 'This is a error notification type text description. For testing purposes.', read: false },
      { id: 5, type: 'success', icon: 'circle-check', title: 'Notification 5', description: 'This is a success notification type text description. For testing purposes.', read: false },
      { id: 6, type: 'info', icon: 'info-circle', title: 'Notification 6', description: 'This is a info notification type text description. For testing purposes.', read: false },
      { id: 7, type: 'warning', icon: 'alert-triangle', title: 'Notification 7', description: 'This is a danger notification type text description. For testing purposes.', read: false },
      { id: 8, type: 'error', icon: 'exclamation-circle', title: 'Notification 8', description: 'This is a error notification type text description. For testing purposes.', read: false },
      { id: 9, type: 'success', icon: 'circle-check', title: 'Notification 9', description: 'This is a success notification type text description. For testing purposes.', read: false },
      { id: 10, type: 'info', icon: 'info-circle', title: 'Notification 10', description: 'This is a info notification type text description. For testing purposes.', read: false },
    ];
    this.notificationsUnread = this.notificationList.filter(n => !n.read).length;
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

  markNotificationAsRead(noti: any): void {
    noti.read = true;
    this.notificationsUnread = this.notificationList.filter(n => !n.read).length;
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
