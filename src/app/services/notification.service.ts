import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, asyncScheduler, delay, map, scheduled } from 'rxjs';
import { INavbarNotification } from '../interfaces/INavbarNotification.interface';
import { IAPIResponse } from '../interfaces/APIResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  http: HttpClient = inject(HttpClient);
  readonly baseURL: string = environment.baseURL;

  fakeNotificationsS = signal<INavbarNotification[]>([]);

  constructor() { }

  // FIXME: ENDPOINT NO EXISTENTE
  fetchAll(): Observable<IAPIResponse> {
    //return this.http.get(`${this.baseURL}/notifications`);

    return this.http.get('assets/fake-data/notifications.json')
      .pipe(
        delay(1000),
        map((data: any) => {
          this.fakeNotificationsS.update(oldData => {
            return oldData.length === 0 ? data : oldData;
          });
          return { message: 'Notificaciones obtenidas correctamente.', statusCode: 200, data: this.fakeNotificationsS() };
        })
      );
  }

  // FIXME: ENDPOINT NO EXISTENTE
  markAsRead(notificationId: number, payload: any): Observable<IAPIResponse> {
    //return this.http.put(`${this.baseURL}/notifications/${notificationId}`, payload);

    return scheduled([{ message: 'Notificación marcada como leída correctamente.', statusCode: 200, data: null }], asyncScheduler)
      .pipe(
        delay(1000),
        map((data: any) => {
          this.fakeNotificationsS.update(oldData => {
            const notificationIdx = oldData.findIndex(n => n.id === notificationId);
            if (notificationIdx !== -1) {
              const { read } = payload;
              oldData[notificationIdx] = {
                ...oldData[notificationIdx],
                read
              };
            }
            return oldData;
          });
          return data;
        })
      );
  }
}
