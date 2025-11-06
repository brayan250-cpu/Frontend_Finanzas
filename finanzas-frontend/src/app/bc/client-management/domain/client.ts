export interface ClientId { value: string; }
export interface DocumentNumber { value: string; }

export interface Client {
  id: ClientId;
  fullName: string;
  document: DocumentNumber;
  email?: string;
  createdAt: Date;
  realStateCompanyId: number;
}

export interface CreateClientDto {
  fullName: string;
  document: string;
  email?: string;
  realStateCompanyId: number;
}

export interface UpdateClientDto {
  fullName?: string;
  document?: string;
  email?: string;
}
