import { Component, Input, OnInit, inject } from '@angular/core';
import { LayoutConfig, Link } from '../../../interfaces/ILayoutConfig.interface';
import { CommonModule, UpperCasePipe } from '@angular/common';
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
    UpperCasePipe
  ],
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.scss'
})
export class SidebarItemComponent implements OnInit {
  @Input('link') link!: Link;
  @Input('showIcon') showIcon: boolean = true;
  @Input('customCss') customCss: string[] = [];
  layoutService: LayoutService = inject(LayoutService);
  configS: LayoutConfig = this.layoutService.configS();

  constructor() {
  }

  ngOnInit(): void {

  }

  displayTitleName(link: Link): string {
    return link.name.length > 15 && link.displayName.length < 25 ? link.displayName : link.name;
  }

  displayLinkName(link: Link): string {
    return link.name.length > 15 && link.displayName.length < 25 ? link.displayName : link.name;
  }

  onClickChild(link: Link): void {
    console.log('link', link)
    link.isOpen = !link.isOpen;
  }
}
