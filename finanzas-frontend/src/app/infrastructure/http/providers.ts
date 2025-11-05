import { Provider } from '@angular/core';
import { ClientHttpRepository } from './client.http.repository';
import { CLIENT_REPOSITORY } from '../../application/tokens';

export const INFRASTRUCTURE_PROVIDERS: Provider[] = [
  { provide: CLIENT_REPOSITORY, useExisting: ClientHttpRepository },
];
