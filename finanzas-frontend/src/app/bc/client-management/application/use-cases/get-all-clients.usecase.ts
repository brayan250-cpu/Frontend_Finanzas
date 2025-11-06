import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Client } from '../../domain/client';
import { ClientRepository } from '../ports/client.repository';
import { CLIENT_REPOSITORY } from '../client-management.tokens';

@Injectable({ providedIn: 'root' })
export class GetAllClientsUseCase {
  private readonly repo = inject<ClientRepository>(CLIENT_REPOSITORY);
  readonly loading = signal(false);

  execute(realStateCompanyId: number): Observable<Client[]> {
    this.loading.set(true);
    return this.repo
      .listByRealStateCompany(realStateCompanyId)
      .pipe(finalize(() => this.loading.set(false)));
  }
}
