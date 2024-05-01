import { Component, Input, OnInit, inject } from '@angular/core';
import { LayoutConfig, Link } from '../../../interfaces/ILayoutConfig.interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { LayoutService } from '../../../services/layout.service';

@Component({
  selector: 'app-sidebar-item',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TablerIconsModule,
  ],
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.scss'
})
export class SidebarItemComponent implements OnInit {
  @Input('link') link!: Link;
  layoutService: LayoutService = inject(LayoutService);
  configS: LayoutConfig = this.layoutService.configS();

  constructor() { }

  ngOnInit(): void {
    console.log('link', this.link);
  }
}
