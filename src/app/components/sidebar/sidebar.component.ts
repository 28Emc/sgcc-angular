import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { SidebarItemComponent } from './sidebar-item/sidebar-item.component';
import { LayoutConfig } from '../../interfaces/ILayoutConfig.interface';
import { LayoutService } from '../../services/layout.service';

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
  layoutService: LayoutService = inject(LayoutService);
  configS: LayoutConfig = this.layoutService.configS();

  ngOnInit(): void {
    if (this.configS.darkMode) {
      document.body.classList.toggle('dark');
    }
  }

  onToggleSidebar(): void {
    this.configS.sidebar.opened = !this.configS.sidebar.opened;
    this.layoutService.persistConfig(this.configS);
  }
}
