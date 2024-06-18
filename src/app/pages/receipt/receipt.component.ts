import { Component } from '@angular/core';
import { ContentHeaderComponent } from "../../shared/components/content-header/content-header.component";

@Component({
    selector: 'app-receipt',
    standalone: true,
    templateUrl: './receipt.component.html',
    styleUrl: './receipt.component.scss',
    imports: [ContentHeaderComponent]
})
export class ReceiptComponent {

}
