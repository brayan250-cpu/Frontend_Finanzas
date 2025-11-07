import { inject, Injectable } from '@angular/core';
import { CLIENT_REPOSITORY } from '../../../application/tokens';
import { Client } from '../domain/client';
import { ClientRepository } from './client.repository';

@Injectable({ providedIn: 'root' })
export class GetAllClientsUseCase {
  private readonly repository = inject<ClientRepository>(CLIENT_REPOSITORY);

  execute(): Promise<Client[]> {
    return this.repository.getAll();
  }
}
