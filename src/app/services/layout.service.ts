import { Injectable, inject, signal } from '@angular/core';
import { LayoutConfig, defaultConfig } from '../interfaces/ILayoutConfig.interface';
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
}
