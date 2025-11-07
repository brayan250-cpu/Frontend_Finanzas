import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { RealStateCompanyRepository } from '../ports/real-state-company.repository';
import { REAL_STATE_COMPANY_REPOSITORY } from '../iam.tokens';
import { SignInRealStateCompanyDto } from '../../domain/real-state-company';

@Injectable({ providedIn: 'root' })
export class SignInRealStateCompanyUseCase {
  private readonly repo = inject<RealStateCompanyRepository>(REAL_STATE_COMPANY_REPOSITORY);
  readonly loading = signal(false);

  execute(payload: SignInRealStateCompanyDto): Observable<number> {
    this.loading.set(true);
    return this.repo.signIn(payload).pipe(finalize(() => this.loading.set(false)));
  }
}
