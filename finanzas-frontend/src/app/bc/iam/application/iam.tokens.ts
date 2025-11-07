import { InjectionToken } from '@angular/core';
import { RealStateCompanyRepository } from './ports/real-state-company.repository';

export const REAL_STATE_COMPANY_REPOSITORY = new InjectionToken<RealStateCompanyRepository>(
  'REAL_STATE_COMPANY_REPOSITORY',
);
