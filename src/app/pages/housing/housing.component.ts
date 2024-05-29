import { Component } from '@angular/core';
import { ContentHeaderComponent } from '../../shared/components/content-header/content-header.component';

@Component({
  selector: 'app-housing',
  standalone: true,
  imports: [
    ContentHeaderComponent
  ],
  templateUrl: './housing.component.html',
  styleUrl: './housing.component.scss'
})
export class HousingComponent {
  contentHeaderTitle: string = 'Edificios';
  breadcumbItems: string[] = ['Catálogo', 'Edificios'];
}
