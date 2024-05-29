import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layouts/vertical/vertical.component').then((c) => c.VerticalComponent),
    // canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then((c) => c.DashboardComponent),
      },
      {
        path: 'housings',
        loadComponent: () => import('./pages/housing/housing.component').then((c) => c.HousingComponent),
      },
      {
        path: 'rooms',
        loadComponent: () => import('./pages/room/room.component').then((c) => c.RoomComponent),
      },
      {
        path: 'tenants',
        loadComponent: () => import('./pages/tenant/tenant.component').then((c) => c.TenantComponent),
      },
      {
        path: 'receipts',
        loadComponent: () => import('./pages/receipt/receipt.component').then((c) => c.ReceiptComponent),
      },
      {
        path: 'measuring-devices',
        loadComponent: () => import('./pages/measuring-device/measuring-device.component').then((c) => c.MeasuringDeviceComponent),
      },
      {
        path: 'measuring-device-readings',
        loadComponent: () => import('./pages/measuring-device-reading/measuring-device-reading.component').then((c) => c.MeasuringDeviceReadingComponent),
      },
      {
        path: 'calculations',
        loadComponent: () => import('./pages/calculation/calculation.component').then((c) => c.CalculationComponent),
      },
      //? AQUÍ SE DEFINE EL ENRUTAMIENTO DE LOS DISTINTOS COMPONENTES DEL SISTEMA
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      }
    ]
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./pages/authentication/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'auth/redirect',
    loadComponent: () => import('./pages/authentication/redirect/redirect.component').then((c) => c.RedirectComponent),
  },
  {
    path: '**',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  }
];
