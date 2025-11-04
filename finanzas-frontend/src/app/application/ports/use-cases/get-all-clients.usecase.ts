import { inject, Injectable, signal } from '@angular/core';
import { Client } from '../../domain/models/client';
import { ClientRepository } from '../ports/client.repository';

const CLIENT_REPOSITORY = Symbol.for('ClientRepository');

@Injectable({ providedIn: 'root' })
export class GetAllClientsUseCase {
  private readonly repo = inject<ClientRepository>(CLIENT_REPOSITORY as any);
  loading = signal(false);

  async execute(): Promise<Client[]> {
    this.loading.set(true);
    try { return await this.repo.findAll(); }
    finally { this.loading.set(false); }
  }
}

export { CLIENT_REPOSITORY };
