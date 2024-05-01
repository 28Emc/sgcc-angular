import { Injectable, signal } from '@angular/core';
import { LayoutConfig, defaultConfig } from '../interfaces/ILayoutConfig.interface';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  config: LayoutConfig = defaultConfig;
  configS = signal(this.config);

  constructor() {
    if (sessionStorage.getItem('config') !== null) {
      this.configS.set(JSON.parse(sessionStorage.getItem('config') as string));
    } else {
      this.persistConfig(this.config);
    }
  }

  persistConfig(config: LayoutConfig): void {
    sessionStorage.setItem('config', JSON.stringify(config));
  }
}
