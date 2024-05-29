import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-content-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TablerIconsModule
  ],
  templateUrl: './content-header.component.html',
  styleUrl: './content-header.component.scss'
})
export class ContentHeaderComponent {
  @Input() contentHeaderTitle: string = '';
  @Input() breadcumbItems: string[] = [];
}
