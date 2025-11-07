import { Provider } from '@angular/core';
import { CLIENT_REPOSITORY } from '../../../../application/tokens';
import { ClientHttpRepository } from './client.http.repository';

export const CLIENT_MANAGEMENT_PROVIDERS: Provider[] = [
  ClientHttpRepository,
  { provide: CLIENT_REPOSITORY, useExisting: ClientHttpRepository },
];
