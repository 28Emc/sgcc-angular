import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, ElementRef, OnInit, ViewChild, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LayoutConfig } from '../../interfaces/ILayoutConfig.interface';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SidebarComponent,
    NavbarComponent,
  ],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss'
})
export class DefaultComponent implements OnInit, AfterViewInit {
  @ViewChild('main') main!: ElementRef;
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
  }
}
