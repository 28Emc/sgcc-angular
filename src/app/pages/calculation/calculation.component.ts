import { Component } from '@angular/core';
import { ContentHeaderComponent } from "../../shared/components/content-header/content-header.component";

@Component({
    selector: 'app-calculation',
    standalone: true,
    templateUrl: './calculation.component.html',
    styleUrl: './calculation.component.scss',
    imports: [ContentHeaderComponent]
})
export class CalculationComponent {

}
