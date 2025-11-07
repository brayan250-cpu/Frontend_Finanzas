import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { Client } from '../../domain/client';
import { ClientRepository } from '../../application/ports/client.repository';

interface ClientDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  realStateCompanyId: number;
}

@Injectable({ providedIn: 'root' })
export class ClientHttpRepository implements ClientRepository {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/clients`;

  async getAll(): Promise<Client[]> {
    const response = await firstValueFrom(this.http.get<ClientDto[]>(this.baseUrl));
    return (response ?? []).map(client => this.toDomain(client));
  }

  private toDomain(dto: ClientDto): Client {
    return {
      id: String(dto.id),
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      phone: dto.phone,
      realStateCompanyId: dto.realStateCompanyId,
    };
  }
}
