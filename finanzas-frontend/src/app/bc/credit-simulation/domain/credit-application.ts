export type CreditApplicationStatus = 'PENDING'|'APPROVED'|'REJECTED';
export interface CreditApplicationId { value: string; }

export interface CreditApplication {
  id: CreditApplicationId;
  clientId: string;
  amount: number;
  termMonths: number;
  interestRateAnnual: number;
  status: CreditApplicationStatus;
  createdAt: Date;
}
