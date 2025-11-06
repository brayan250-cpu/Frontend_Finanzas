import { inject, Injectable, signal } from '@angular/core';
import { Client } from '../../domain/client';
import { ClientRepository } from '../ports/client.repository';
import { CLIENT_REPOSITORY } from '../client-management.tokens';

@Injectable({ providedIn: 'root' })
export class GetAllClientsUseCase {
  private readonly repo = inject<ClientRepository>(CLIENT_REPOSITORY);
  loading = signal(false);

  async execute(): Promise<Client[]> {
    this.loading.set(true);
    try { return await this.repo.findAll(); }
    finally { this.loading.set(false); }
  }
}
