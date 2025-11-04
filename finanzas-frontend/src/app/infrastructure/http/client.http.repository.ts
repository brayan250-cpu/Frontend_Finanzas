import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Client } from '../../domain/models/client';
import { ClientRepository } from '../../application/ports/client.repository';

@Injectable({ providedIn: 'root' })
export class ClientHttpRepository implements ClientRepository {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/clients`;

  async findAll(): Promise<Client[]> {
    const raw = await this.http.get<any[]>(this.base).toPromise();
    return (raw ?? []).map(this.toDomain);
  }
  async findById(id: string): Promise<Client | null> {
    const r = await this.http.get<any>(`${this.base}/${id}`).toPromise();
    return r ? this.toDomain(r) : null;
  }
  async create(payload: Omit<Client,'id'|'createdAt'>): Promise<Client> {
    const body = this.fromDomain(payload as any);
    const r = await this.http.post<any>(this.base, body).toPromise();
    return this.toDomain(r!);
  }

  private toDomain = (dto: any): Client => ({
    id: { value: String(dto.id) },
    fullName: dto.fullName,
    document: { value: dto.document },
    email: dto.email,
    createdAt: new Date(dto.createdAt)
  });

  private fromDomain = (c: any) => ({
    fullName: c.fullName,
    document: c.document?.value ?? c.document,
    email: c.email
  });
}
