import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SidebarComponent,
  ],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss'
})
export class DefaultComponent {
  @ViewChild('main') main!: ElementRef;

  onToggleSidebar(eventToggle: boolean): void {
    if (eventToggle) {
      this.main.nativeElement.style.left = '78px';
      this.main.nativeElement.style.height = '100vh';
      this.main.nativeElement.style.width = 'calc(100% - 78px)';
    } else {
      this.main.nativeElement.style.left = '250px';
      this.main.nativeElement.style.height = '100vh';
      this.main.nativeElement.style.width = 'calc(100% - 250px)';
    }
  }
}
