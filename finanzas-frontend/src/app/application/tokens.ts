import { InjectionToken } from '@angular/core';
import { ClientRepository } from './ports/client.repository';

export const CLIENT_REPOSITORY = new InjectionToken<ClientRepository>('CLIENT_REPOSITORY');
