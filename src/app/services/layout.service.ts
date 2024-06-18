import { Injectable, inject, signal } from '@angular/core';
import { LayoutConfig, Link, defaultConfig } from '../interfaces/ILayoutConfig.interface';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  securityService: SecurityService = inject(SecurityService);
  config: LayoutConfig = defaultConfig;
  configS = signal(this.config);
  readonly SIDEBAR_OPEN_WIDTH = '250px';
  readonly SIDEBAR_COLLAPSED_WIDTH = '78px';
  private _flatArray: Link[] = [];

  constructor() {
    if (this.securityService.getItem('config')) {
      this.configS.set(this.securityService.getItem('config') as LayoutConfig);
    } else {
      this.persistConfig(this.config);
    }
  }

  persistConfig(config: LayoutConfig): void {
    this.securityService.setItem('config', config);
  }

  rawToGroupedLinks(rawLinks: any[]): Link[] {
    const groupedLinks: any = {};
    rawLinks.forEach(titleLinks => {
      if (titleLinks.type === 'title') {
        groupedLinks[+titleLinks.id] = { ...titleLinks, children: [] };
      }
    });
    rawLinks.forEach(mixedLinks => {
      if (mixedLinks.type === 'link') {
        if (groupedLinks[mixedLinks.parentId]) {
          groupedLinks[mixedLinks.parentId].children.push(mixedLinks);
        } else {
          groupedLinks[mixedLinks.id] = mixedLinks;
        }
      }
    });
    return Object.values(groupedLinks);
  }

  groupedToRawLinks(groupedLinks: Link[]): any[] {
    this._flatArray = [];
    groupedLinks.forEach((item: Link) => this._processItem(item));
    return this._flatArray.sort((a, b) => a.id - b.id);
  }

  private _processItem(item: Link): void {
    this._flatArray.push({
      id: item.id,
      parentId: item.parentId,
      type: item.type,
      name: item.name,
      displayName: item.displayName,
      icon: item.icon,
      url: item.url
    });
    if (item.children && item.children.length > 0) {
      item.children.forEach((child: Link) => this._processItem(child));
    }
  }

  findItemWithPathByUrl(groupedLinks: Link[], url: string) {
    const resultArray = [];
    const foundItem = this._searchItemsByUrl(groupedLinks, url);
    if (foundItem) {
      resultArray.push(foundItem);
      this._addParents(groupedLinks, foundItem.parentId, resultArray);
    }
    return resultArray;
  }

  private _searchItemsByUrl(groupedLinks: Link[], url: string) {
    for (const item of groupedLinks) {
      if (item.url === url) {
        return item;
      } else if (item.children) {
        const foundChild: any = this._searchItemsByUrl(item.children, url);
        if (foundChild) return foundChild;
      }
    }
    return null;
  }

  private _addParents(groupedLinks: Link[], childId: number, resultArray: any[]) {
    for (const item of groupedLinks) {
      if (item.id === childId) {
        resultArray.unshift(item);
        if (item.parentId !== 0) {
          this._addParents(groupedLinks, item.parentId, resultArray);
        }
        break;
      } else if (item.children) {
        this._addParents(item.children, childId, resultArray);
      }
    }
  }
}
