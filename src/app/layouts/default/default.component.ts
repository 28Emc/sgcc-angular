import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SidebarComponent,
    NavbarComponent
  ],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss'
})
export class DefaultComponent {
  @ViewChild('main') main!: ElementRef;

  onToggleSidebar(eventToggle: boolean): void {
    if (eventToggle) {
      this.main.nativeElement.classList.remove('left-[250px]', 'h-screen', 'w-[calc(100%-250px)]');
      this.main.nativeElement.classList.add('left-[75px]', 'h-screen', 'w-[calc(100%-75px)]');
    } else {
      this.main.nativeElement.classList.remove('left-[75px]', 'h-screen', 'w-[calc(100%-75px)]');
      this.main.nativeElement.classList.add('left-[250px]', 'h-screen', 'w-[calc(100%-250px)]');
    }
  }
}
