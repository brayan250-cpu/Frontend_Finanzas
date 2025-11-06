import { Observable } from 'rxjs';
import { Client, CreateClientDto, UpdateClientDto } from '../../domain/client';

export abstract class ClientRepository {
  abstract getById(id: number): Observable<Client>;
  abstract listByRealStateCompany(realStateCompanyId: number): Observable<Client[]>;
  abstract create(payload: CreateClientDto): Observable<Client>;
  abstract update(id: number, payload: UpdateClientDto): Observable<Client>;
  abstract delete(id: number): Observable<void>;
}
