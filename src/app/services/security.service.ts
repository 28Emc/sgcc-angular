import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import SecureLS from 'secure-ls';
import { Observable, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);
  readonly baseURL: string = environment.baseURL;
  secureStorage = new SecureLS({
    encodingType: 'AES',
    encryptionSecret: environment.secretKey,
    isCompression: true
  });

  constructor() { }

  isUserLoggedIn(): Observable<boolean> {
    return of(this.secureStorage.get('tkn'));
  }

  setItem(key: string, data: any): void {
    this.secureStorage.set(key, data);
  }

  getItem(key: string): any {
    return this.secureStorage.get(key);
  }

  removeKey(key: string): any {
    return this.secureStorage.remove(key);
  }

  clear(): void {
    this.secureStorage.clear();
  }

  refreshToken(): Observable<any> {
    return this.http.post(`${this.baseURL}/auth/jwt/refresh`, null)
      .pipe(
        map((refreshJwtPayload: any) => {
          return {
            message: 'JWT has been refreshed successfully.',
            details: refreshJwtPayload
          }
        })
      );
  }
}
