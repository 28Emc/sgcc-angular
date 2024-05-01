import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import SecureLS from 'secure-ls';
import { Observable, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  readonly baseURL: string = environment.baseURL;
  secureStorage = new SecureLS({
    encodingType: 'AES',
    encryptionSecret: environment.secretKey,
    isCompression: true
  });

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  isUserLoggedIn(): Observable<boolean> {
    return of(this.secureStorage.get('tkn'));
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
