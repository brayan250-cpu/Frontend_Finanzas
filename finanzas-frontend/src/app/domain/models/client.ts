export interface ClientId { value: string; }
export interface DocumentNumber { value: string; }

export interface Client {
  id: ClientId;
  fullName: string;
  document: DocumentNumber;
  email?: string;
  createdAt: Date;
}
