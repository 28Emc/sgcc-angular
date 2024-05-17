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
        loadComponent: () => import('./pages/dashboard/dashboard.component').then((c) => c.DashboardComponent),
      },
      {
        path: 'rooms',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then((c) => c.DashboardComponent),
      },
      {
        path: 'tenants',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then((c) => c.DashboardComponent),
      },
      {
        path: 'receipts',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then((c) => c.DashboardComponent),
      },
      {
        path: 'measuring-devices',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then((c) => c.DashboardComponent),
      },
      {
        path: 'measuring-device-readings',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then((c) => c.DashboardComponent),
      },
      {
        path: 'calculations',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then((c) => c.DashboardComponent),
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
