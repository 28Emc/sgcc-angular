import { Component } from '@angular/core';
import { ContentHeaderComponent } from "../../shared/components/content-header/content-header.component";

@Component({
    selector: 'app-room',
    standalone: true,
    templateUrl: './room.component.html',
    styleUrl: './room.component.scss',
    imports: [ContentHeaderComponent]
})
export class RoomComponent {

}
