import { Component } from '@angular/core';
import { ContentHeaderComponent } from "../../shared/components/content-header/content-header.component";

@Component({
    selector: 'app-tenant',
    standalone: true,
    templateUrl: './tenant.component.html',
    styleUrl: './tenant.component.scss',
    imports: [ContentHeaderComponent]
})
export class TenantComponent {

}
