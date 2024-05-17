import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, ElementRef, OnInit, ViewChild, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { INotificationItem, LayoutConfig } from '../../interfaces/ILayoutConfig.interface';
import { LayoutService } from '../../services/layout.service';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SidebarComponent,
    NavbarComponent,
    ClickOutsideDirective
  ],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss'
})
export class DefaultComponent implements OnInit, AfterViewInit {
  @ViewChild('sidebar', { static: true }) sidebar!: ElementRef<HTMLElement>;
  @ViewChild('main', { static: true }) main!: ElementRef<HTMLElement>;
  /* @ViewChild('navbar', { static: true }) navbar!: ElementRef;
  @ViewChild('content', { static: true }) content!: ElementRef; */
  readonly SIDEBAR_OPEN_WIDTH = '250px';
  readonly SIDEBAR_COLLAPSED_WIDTH = '78px';
  layoutService: LayoutService = inject(LayoutService);
  configS: LayoutConfig = this.layoutService.configS();

  notificationList: INotificationItem[] = [];
  notificationsUnread: number = 0;
  notificationsClicked: boolean = false;
  currentUser: any = null;
  avatarClicked: boolean = false;
  isXSmallS = signal<boolean>(false);

  constructor(
    private breakpointObserver: BreakpointObserver,
    private destroyRef: DestroyRef,
  ) { }

  ngOnInit(): void {
    if (this.configS.darkMode) {
      document.body.classList.toggle('dark');
    }
    if (this.configS.sidebar.collapsed) {
      this.sidebar.nativeElement.classList.toggle('open');
    }

    this.getNotifications();
    this.getUserInfo();
  }

  ngAfterViewInit(): void {
    // this.onToggleSidebar(this.configS.sidebar.collapsed);
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

  getNotifications(): void {
    this.notificationList = [
      { id: 1, type: 'success', icon: 'bx-check-circle', title: 'Notification 1', description: 'This is a success notification type text description. For testing purposes.', read: false },
      { id: 2, type: 'info', icon: 'bx-info-circle', title: 'Notification 2', description: 'This is a info notification type text description. For testing purposes.', read: false },
      { id: 3, type: 'warning', icon: 'bx-error', title: 'Notification 3', description: 'This is a danger notification type text description. For testing purposes.', read: false },
      { id: 4, type: 'error', icon: 'bx-error-circle', title: 'Notification 4', description: 'This is a error notification type text description. For testing purposes.', read: false },
      { id: 5, type: 'success', icon: 'bx-check-circle', title: 'Notification 5', description: 'This is a success notification type text description. For testing purposes.', read: false },
      { id: 6, type: 'info', icon: 'bx-info-circle', title: 'Notification 6', description: 'This is a info notification type text description. For testing purposes.', read: false },
      { id: 7, type: 'warning', icon: 'bx-error', title: 'Notification 7', description: 'This is a danger notification type text description. For testing purposes.', read: false },
      { id: 8, type: 'error', icon: 'bx-error-circle', title: 'Notification 8', description: 'This is a error notification type text description. For testing purposes.', read: false },
      { id: 9, type: 'success', icon: 'bx-check-circle', title: 'Notification 9', description: 'This is a success notification type text description. For testing purposes.', read: false },
      { id: 10, type: 'info', icon: 'bx-error-circle', title: 'Notification 10', description: 'This is a info notification type text description. For testing purposes.', read: false },
    ];
    this.notificationsUnread = this.notificationList.filter(n => !n.read).length;
  }

  getUserInfo() {
    this.currentUser = {
      username: 'Edinson M. Ch.',
      role: 'Admin',
      // avatar: 'https://picsum.photos/32/32'
    };
  }

  /* sidebar */
  onToggleSidebar(): void {
    this.sidebar.nativeElement.classList.toggle('open');
    this.configS.sidebar.collapsed = !this.configS.sidebar.collapsed;
    this.layoutService.persistConfig(this.configS);
  }

  /* onToggleNavbar(): void {
    this.sidebar.nativeElement.classList.toggle('open');
    this.configS.sidebar.collapsed = !this.configS.sidebar.collapsed;
    this.layoutService.persistConfig(this.configS);
  } */

  /* navbar */
  onToggleDarkMode(): void {
    document.body.classList.toggle('dark');
    this.configS.darkMode = !this.configS.darkMode;
    console.log('this.configS.darkMode', this.configS.darkMode)
    this.layoutService.persistConfig(this.configS);
  }

  /* onToggleSidebar(collapsed: boolean): void {
    if (collapsed) {
      console.log("collapsed on", collapsed);
      this.main.nativeElement.classList.remove(`left-[${this.SIDEBAR_OPEN_WIDTH}]`, `w-[calc(100%-${this.SIDEBAR_OPEN_WIDTH})]`);
      this.main.nativeElement.classList.add(`left-[${this.SIDEBAR_COLLAPSED_WIDTH}]`, `w-[calc(100%-${this.SIDEBAR_COLLAPSED_WIDTH})]`);
      this.content.nativeElement.classList.remove(`left-[${this.SIDEBAR_OPEN_WIDTH}]`, `w-[calc(100%-${this.SIDEBAR_OPEN_WIDTH})]`);
      this.content.nativeElement.classList.add(`left-[${this.SIDEBAR_COLLAPSED_WIDTH}]`, `w-[calc(100%-${this.SIDEBAR_COLLAPSED_WIDTH})]`);
    } else {
      console.log("collapsed off", collapsed);
      this.main.nativeElement.classList.remove(`left-[${this.SIDEBAR_COLLAPSED_WIDTH}]`, `w-[calc(100%-${this.SIDEBAR_COLLAPSED_WIDTH})]`);
      this.main.nativeElement.classList.add(`left-[${this.SIDEBAR_OPEN_WIDTH}]`, `w-[calc(100%-${this.SIDEBAR_OPEN_WIDTH})]`);
      this.content.nativeElement.classList.remove(`left-[${this.SIDEBAR_COLLAPSED_WIDTH}]`, `w-[calc(100%-${this.SIDEBAR_COLLAPSED_WIDTH})]`);
      this.content.nativeElement.classList.add(`left-[${this.SIDEBAR_OPEN_WIDTH}]`, `w-[calc(100%-${this.SIDEBAR_OPEN_WIDTH})]`);
    }
    console.log('this.main.nativeElement.classList', this.main.nativeElement.classList)
    console.log('this.content.nativeElement.classList', this.content.nativeElement.classList)
  } */


  /* user */
  onUserAvatarClicked(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.avatarClicked = !this.avatarClicked;
  }

  /* notifications */
  onNotificationsClicked(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.notificationsClicked = !this.notificationsClicked;
  }

  markNotificationAsRead(noti: any): void {
    noti.read = true;
    this.notificationsUnread = this.notificationList.filter(n => !n.read).length;
  }






  /* @ViewChild('main') main!: ElementRef;
  layoutService: LayoutService = inject(LayoutService);
  configS: LayoutConfig = this.layoutService.configS();
  isXSmallS = signal<boolean>(false);

  constructor(
    private breakpointObserver: BreakpointObserver,
    private destroyRef: DestroyRef,
  ) {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.breakpointObserver.observe(Breakpoints.XSmall)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(state => {
        console.log('state', state)
        if (state.matches) {
          this.isXSmallS.set(true);
          console.log("is small");
          this.onToggleSidebarMobile(this.configS.sidebar.collapsed);
        } else {
          this.isXSmallS.set(false);
          console.log("is not small");
          this.main.nativeElement.classList = [];
          this.main.nativeElement.classList.add('absolute', 'top-0', 'bg-body-light', 'dark:bg-body-dark', 'h-screen', 'transition-all');
          this.onToggleSidebarWeb(this.configS.sidebar.collapsed);
        }
      });
  }

  onToggleSidebar(eventToggle: boolean, type: 'web' | 'mobile'): void {
    if (type === 'web') {
      this.onToggleSidebarWeb(eventToggle);
    } else {
      this.onToggleSidebarMobile(eventToggle);
    }
  }

  onToggleSidebarWeb(eventToggle: boolean): void {
    this.main.nativeElement.classList = [];
    this.main.nativeElement.classList.add('absolute', 'top-0', 'bg-body-light', 'dark:bg-body-dark', 'h-screen', 'transition-all');
    if (eventToggle) {
      console.log("collapsed on", eventToggle);
      this.main.nativeElement.classList.remove('left-[250px]', 'w-[calc(100%-250px)]');
      this.main.nativeElement.classList.add('left-[75px]', 'w-[calc(100%-75px)]');
    } else {
      console.log("collapsed off", eventToggle);
      this.main.nativeElement.classList.remove('left-[75px]', 'w-[calc(100%-75px)]');
      this.main.nativeElement.classList.add('left-[250px]', 'w-[calc(100%-250px)]');
    }
  }

  onToggleSidebarMobile(eventToggle: boolean): void {
    this.main.nativeElement.classList = [];
    this.main.nativeElement.classList.add('absolute', 'top-0', 'bg-body-light', 'dark:bg-body-dark', 'h-screen', 'w-full', 'transition-all');
    if (eventToggle) {
      console.log("collapsed mobile on", eventToggle);
      this.main.nativeElement.classList.remove('brightness-50');
      this.main.nativeElement.classList.add('brightness-100', 'z-0');
    } else {
      console.log("collapsed mobile off", eventToggle);
      this.main.nativeElement.classList.remove('brightness-100', 'z-0');
      this.main.nativeElement.classList.add('brightness-50');
    }
  } */
}
