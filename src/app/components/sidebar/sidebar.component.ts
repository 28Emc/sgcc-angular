import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { LayoutService } from '../../services/layout.service';
import { LayoutConfig } from '../../interfaces/ILayoutConfig.interface';
import { SidebarItemComponent } from './sidebar-item/sidebar-item.component';

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
export class SidebarComponent implements AfterViewInit {
  @Output('toggleSidebar') toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('sidebar') sidebarEl!: ElementRef;
  @ViewChild('searchBox') searchBox!: ElementRef;
  layoutService: LayoutService = inject(LayoutService);
  configS: LayoutConfig = this.layoutService.configS();
  modeText: string = this.configS.sidebar.darkMode ? 'Light mode' : 'Dark mode';

  ngAfterViewInit(): void {
    document.body.classList.remove('dark');
    this.toggleSidebar.emit(this.configS.sidebar.collapsed);
    this.sidebarEl.nativeElement.classList.remove('close');
    if (this.configS.sidebar.darkMode) {
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

  onToggleSwitch(): void {
    this.configS.sidebar.darkMode = !this.configS.sidebar.darkMode;
    this.layoutService.persistConfig(this.configS);
    document.body.classList.toggle('dark');
    this.modeText = document.body.classList.contains('dark') ? 'Light mode' : 'Dark mode';
  }
}
