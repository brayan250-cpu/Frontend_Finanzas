import { Provider } from '@angular/core';
import { ClientRepository } from '../../application/ports/client.repository';
import { ClientHttpRepository } from './client.http.repository';
import { CLIENT_REPOSITORY } from '../../application/use-cases/get-all-clients.usecase';

export const INFRASTRUCTURE_PROVIDERS: Provider[] = [
  { provide: CLIENT_REPOSITORY, useExisting: ClientHttpRepository },
];
