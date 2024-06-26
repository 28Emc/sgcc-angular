import { Component, Input, inject } from '@angular/core';
import { LayoutConfig, Link } from '../../../interfaces/ILayoutConfig.interface';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
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
export class SidebarItemComponent {
  @Input('link') link!: Link;
  @Input('showIcon') showIcon: boolean = true;
  @Input('customCss') customCss: string[] = [];
  layoutService: LayoutService = inject(LayoutService);
  router: Router = inject(Router);
  configS: LayoutConfig = this.layoutService.configS();

  isActiveRoute(currentUrl: string): boolean {
    return this.router?.url === currentUrl;
  }

  displayLinkName(link: Link): string {
    return link.name.length > 15 && link.displayName.length < 25 ? link.displayName : link.name;
  }

  onClickChild(link: Link): void {
    link.isOpen = !link.isOpen;
  }
}
