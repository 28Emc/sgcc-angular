import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, EventEmitter, OnInit, Output, inject, signal } from '@angular/core';
import { LayoutConfig } from '../../interfaces/ILayoutConfig.interface';
import { LayoutService } from '../../services/layout.service';
import { TablerIconsModule } from 'angular-tabler-icons';
import { RouterModule } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TablerIconsModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, AfterViewInit {
  @Output('toggleSidebar') toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();
  layoutService: LayoutService = inject(LayoutService);
  configS: LayoutConfig = this.layoutService.configS();
  notificationList: any[] = [];
  notificationsUnread: number = 0;
  currentUser: any = null;
  avatarClicked: boolean = false;
  notificationsClicked: boolean = false;
  isXSmallS = signal<boolean>(false);

  constructor(
    private breakpointObserver: BreakpointObserver,
    private destroyRef: DestroyRef,
  ) { }

  ngOnInit(): void {
    this.currentUser = {
      username: 'Edinson M. Ch.',
      role: 'Admin',
      // avatar: 'https://picsum.photos/32/32'
    };
    this.notificationList = [
      { id: 1, type: 'success', icon: 'circle-check', title: 'Notification 1', description: 'This is a success notification type text description. For testing purposes.', read: false },
      { id: 2, type: 'info', icon: 'alert-circle', title: 'Notification 2', description: 'This is a info notification type text description. For testing purposes.', read: false },
      { id: 3, type: 'warning', icon: 'alert-triangle', title: 'Notification 3', description: 'This is a danger notification type text description. For testing purposes.', read: false },
      { id: 4, type: 'error', icon: 'circle-x', title: 'Notification 4', description: 'This is a error notification type text description. For testing purposes.', read: false },
      { id: 5, type: 'success', icon: 'circle-check', title: 'Notification 5', description: 'This is a success notification type text description. For testing purposes.', read: false },
      { id: 6, type: 'info', icon: 'alert-circle', title: 'Notification 6', description: 'This is a info notification type text description. For testing purposes.', read: false },
      { id: 7, type: 'warning', icon: 'alert-triangle', title: 'Notification 7', description: 'This is a danger notification type text description. For testing purposes.', read: false },
      { id: 8, type: 'error', icon: 'circle-x', title: 'Notification 8', description: 'This is a error notification type text description. For testing purposes.', read: false },
      { id: 9, type: 'success', icon: 'circle-check', title: 'Notification 9', description: 'This is a success notification type text description. For testing purposes.', read: false },
      { id: 10, type: 'info', icon: 'alert-circle', title: 'Notification 10', description: 'This is a info notification type text description. For testing purposes.', read: false },
    ];
    this.notificationsUnread = this.notificationList.filter(n => !n.read).length;
  }

  ngAfterViewInit(): void {
    this.breakpointObserver.observe(Breakpoints.XSmall)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(state => {
        console.log('state', state)
        if (state.matches) {
          this.isXSmallS.set(true);
        } else {
          this.isXSmallS.set(false);
        }
      });
  }

  onToggleSidebar(): void {
    this.configS.sidebar.collapsed = !this.configS.sidebar.collapsed;
    this.layoutService.persistConfig(this.configS);
    this.toggleSidebar.emit(this.configS.sidebar.collapsed);
  }

  onToggleDarkMode(): void {
    this.configS.darkMode = !this.configS.darkMode;
    this.layoutService.persistConfig(this.configS);
    document.body.classList.toggle('dark');
  }

  onUserAvatarClicked(): void {
    this.avatarClicked = !this.avatarClicked;
  }

  onNotificationsClicked(): void {
    this.notificationsClicked = !this.notificationsClicked;
  }

  markNotificationAsRead(noti: any): void {
    noti.read = true;
    this.notificationsUnread = this.notificationList.filter(n => !n.read).length;
  }
}
