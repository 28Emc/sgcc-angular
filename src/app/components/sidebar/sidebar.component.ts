import { CommonModule } from '@angular/common';
import { Component, DestroyRef, ElementRef, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { LayoutService } from '../../services/layout.service';
import { LayoutConfig } from '../../interfaces/ILayoutConfig.interface';
import { SidebarItemComponent } from './sidebar-item/sidebar-item.component';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TablerIconsModule,
    SidebarItemComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  @Output('toggleSidebar') toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('sidebar') sidebar!: ElementRef<HTMLElement>;
  readonly SIDEBAR_OPEN_WIDTH = '250px';
  readonly SIDEBAR_COLLAPSED_WIDTH = '78px';
  layoutService: LayoutService = inject(LayoutService);
  configS: LayoutConfig = this.layoutService.configS();
  currentUser: any = null;

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
    if (this.configS.sidebar.userInfo.visible) {
      this.getUserInfo();
    }
  }

  getUserInfo() {
    this.currentUser = {
      username: 'Edinson M. Ch.',
      role: 'Admin',
      // avatar: 'https://picsum.photos/32/32'
    };
  }

  onToggleSidebar(): void {
    this.sidebar.nativeElement.classList.toggle('open');
    if (this.sidebar.nativeElement.classList.contains('open')) {
      this.sidebar.nativeElement.classList.remove(`w-[${this.SIDEBAR_COLLAPSED_WIDTH}]`);
      this.sidebar.nativeElement.classList.add(`w-[${this.SIDEBAR_OPEN_WIDTH}]`);
    } else {
      this.sidebar.nativeElement.classList.remove(`w-[${this.SIDEBAR_OPEN_WIDTH}]`);
      this.sidebar.nativeElement.classList.add(`w-[${this.SIDEBAR_COLLAPSED_WIDTH}]`);
    }
    this.configS.sidebar.collapsed = !this.configS.sidebar.collapsed;
    this.layoutService.persistConfig(this.configS);
    this.toggleSidebar.emit(this.configS.sidebar.collapsed);
  }




  /* @Output('toggleSidebar') toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output('toggleSidebarMobile') toggleSidebarMobile: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('sidebar') sidebarEl!: ElementRef;
  @ViewChild('searchBox') searchBox!: ElementRef;
  layoutService: LayoutService = inject(LayoutService);
  configS: LayoutConfig = this.layoutService.configS();
  isXSmallS = signal<boolean>(false);
  modeText: string = this.configS.darkMode ? 'Light mode' : 'Dark mode';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private destroyRef: DestroyRef,
  ) {

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

    document.body.classList.remove('dark');
    this.toggleSidebar.emit(this.configS.sidebar.collapsed);
    this.sidebarEl.nativeElement.classList.remove('close');
    if (this.configS.darkMode) {
      document.body.classList.add('dark');
    }
    if (this.configS.sidebar.collapsed) {
      this.sidebarEl.nativeElement.classList.add('close');
    }
  }

  onToggleSidebar(): void {
    this.sidebarEl.nativeElement.classList.toggle('close');
    this.configS.sidebar.collapsed = !this.configS.sidebar.collapsed;
    this.layoutService.persistConfig(this.configS);
    this.toggleSidebar.emit(this.configS.sidebar.collapsed);
  }

  onToggleSidebarMobile(): void {
    this.sidebarEl.nativeElement.classList.toggle('close');
    this.configS.sidebar.collapsed = !this.configS.sidebar.collapsed;
    this.layoutService.persistConfig(this.configS);
    this.toggleSidebarMobile.emit(this.configS.sidebar.collapsed);
  }

  onToggleSwitch(): void {
    this.configS.darkMode = !this.configS.darkMode;
    this.layoutService.persistConfig(this.configS);
    document.body.classList.toggle('dark');
    this.modeText = document.body.classList.contains('dark') ? 'Light mode' : 'Dark mode';
  } */
}
