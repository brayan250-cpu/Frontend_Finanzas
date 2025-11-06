import { CreditApplication } from '../../domain/credit-application';

export interface CreditApplicationRepository {
  findAll(): Promise<CreditApplication[]>;
  create(payload: Omit<CreditApplication,'id'|'status'|'createdAt'>): Promise<CreditApplication>;
  evaluate(id: string): Promise<CreditApplication>;
}
