import { Client } from '../../domain/client';

export interface ClientRepository {
  getAll(): Promise<Client[]>;
}
