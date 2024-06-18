import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { LayoutService } from '../../../services/layout.service';
import { Subject, takeUntil } from 'rxjs';
import { Link } from '../../../interfaces/ILayoutConfig.interface';
import RAW_LINKS from "../../../../assets/fake-data/links.json";

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
export class ContentHeaderComponent implements OnInit, OnDestroy {
  contentHeaderTitle: string = '';
  breadcumbItems: string[] = [];
  layoutService: LayoutService = inject(LayoutService);
  private _unsubscribeAll: Subject<any> = new Subject();

  constructor(
    private _route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this._route.url
      .pipe(
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((event) => {
        const currentPath: string = `/${event[0].path}`;
        const groupedLinks = this.layoutService.configS().sidebar.links;
        const foundLink: Link[] = this.layoutService.findItemWithPathByUrl(groupedLinks, currentPath);
        const linkNames: string[] = foundLink.map(l => l.displayName);
        if (linkNames.length > 0) {
          this.contentHeaderTitle = linkNames[0];
          this.breadcumbItems = linkNames;
        }
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
