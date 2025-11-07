import { InjectionToken } from '@angular/core';
import { ClientRepository } from '../bc/client-management/application/client.repository';

export const CLIENT_REPOSITORY = new InjectionToken<ClientRepository>('CLIENT_REPOSITORY');
