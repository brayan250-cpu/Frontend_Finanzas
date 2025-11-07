import { Provider } from '@angular/core';
import { REAL_STATE_COMPANY_REPOSITORY } from '../../application/iam.tokens';
import { RealStateCompanyHttpRepository } from './real-state-company.http.repository';

export const IAM_INFRASTRUCTURE_PROVIDERS: Provider[] = [
  { provide: REAL_STATE_COMPANY_REPOSITORY, useExisting: RealStateCompanyHttpRepository },
];
