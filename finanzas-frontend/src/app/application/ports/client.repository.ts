import { Client } from '../../domain/models/client';

export interface ClientRepository {
  findAll(): Promise<Client[]>;
  findById(id: string): Promise<Client | null>;
  create(payload: Omit<Client,'id'|'createdAt'>): Promise<Client>;
}
