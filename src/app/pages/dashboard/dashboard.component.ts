import { Component } from '@angular/core';
import { ContentHeaderComponent } from "../../shared/components/content-header/content-header.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [ContentHeaderComponent]
})
export class DashboardComponent {

}
