import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'clients', pathMatch: 'full' },
  { path: 'clients', loadComponent: () => import('./presentation/features/clients/clients-page.component').then(m => m.ClientsPageComponent) },
];
