import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'clients', pathMatch: 'full' },
  { path: 'clients', loadComponent: () => import('./bc/client-management/presentation/clients-page/clients-page.component').then(m => m.ClientsPageComponent) },
];
