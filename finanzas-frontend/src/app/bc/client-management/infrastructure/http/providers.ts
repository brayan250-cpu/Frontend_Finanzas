import { Provider } from '@angular/core';
import { CLIENT_REPOSITORY } from '../../../../application/tokens';
import { ClientHttpRepository } from './client.http.repository';

export const CLIENT_MANAGEMENT_PROVIDERS: Provider[] = [
  { provide: CLIENT_REPOSITORY, useClass: ClientHttpRepository },
];
