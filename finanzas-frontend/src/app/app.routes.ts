import { Routes } from '@angular/router';
import { ClientsPageComponent } from './bc/client-management/presentation/clients/clients-page.component';

export const routes: Routes = [
  { path: 'clients', component: ClientsPageComponent },
  { path: '', pathMatch: 'full', redirectTo: 'clients' },
];
