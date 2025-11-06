import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { Client, CreateClientDto, UpdateClientDto } from '../../domain/client';
import { ClientRepository } from '../../application/ports/client.repository';

interface ClientDto {
  id: number;
  fullName: string;
  document: string;
  email?: string;
  createdAt: string;
  realStateCompanyId: number;
}

@Injectable({ providedIn: 'root' })
export class ClientHttpRepository implements ClientRepository {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/clients`;

  getById(id: number): Observable<Client> {
    return this.http
      .get<ClientDto>(`${this.baseUrl}/${id}`)
      .pipe(map(dto => this.toDomain(dto)));
  }

  listByRealStateCompany(realStateCompanyId: number): Observable<Client[]> {
    return this.http
      .get<ClientDto[]>(`${this.baseUrl}/${realStateCompanyId}/clients`)
      .pipe(map(list => (list ?? []).map(dto => this.toDomain(dto))));
  }

  create(payload: CreateClientDto): Observable<Client> {
    return this.http
      .post<ClientDto>(`${this.baseUrl}/clients`, this.toCreatePayload(payload))
      .pipe(map(dto => this.toDomain(dto)));
  }

  update(id: number, payload: UpdateClientDto): Observable<Client> {
    return this.http
      .put<ClientDto>(`${this.baseUrl}/${id}`, this.toUpdatePayload(payload))
      .pipe(map(dto => this.toDomain(dto)));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  private toDomain(dto: ClientDto): Client {
    return {
      id: { value: String(dto.id) },
      fullName: dto.fullName,
      document: { value: dto.document },
      email: dto.email,
      createdAt: new Date(dto.createdAt),
      realStateCompanyId: dto.realStateCompanyId,
    };
  }

  private toCreatePayload(payload: CreateClientDto) {
    return {
      fullName: payload.fullName,
      document: payload.document,
      email: payload.email,
      realStateCompanyId: payload.realStateCompanyId,
    };
  }

  private toUpdatePayload(payload: UpdateClientDto) {
    return {
      ...(payload.fullName ? { fullName: payload.fullName } : {}),
      ...(payload.document ? { document: payload.document } : {}),
      ...(payload.email !== undefined ? { email: payload.email } : {}),
    };
  }
}
