import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, finalize, switchMap, take, tap } from 'rxjs/operators';
import {
  RealStateCompany,
  SignInRealStateCompanyDto,
  SignUpRealStateCompanyDto,
  UpdateRealStateCompanyDto,
} from '../../domain/real-state-company';
import { SignUpRealStateCompanyUseCase } from '../use-cases/sign-up-real-state-company.usecase';
import { SignInRealStateCompanyUseCase } from '../use-cases/sign-in-real-state-company.usecase';
import { GetRealStateCompanyByIdUseCase } from '../use-cases/get-real-state-company-by-id.usecase';
import { UpdateRealStateCompanyUseCase } from '../use-cases/update-real-state-company.usecase';

@Injectable({ providedIn: 'root' })
export class RealStateCompanyStore {
  private readonly signUpUseCase = inject(SignUpRealStateCompanyUseCase);
  private readonly signInUseCase = inject(SignInRealStateCompanyUseCase);
  private readonly getByIdUseCase = inject(GetRealStateCompanyByIdUseCase);
  private readonly updateUseCase = inject(UpdateRealStateCompanyUseCase);

  private readonly storageKey = 'finanzas.iam.real-state-company-id';

  readonly company = signal<RealStateCompany | null>(null);
  readonly companyId = signal<number | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly isAuthenticated = computed(() => this.companyId() !== null);

  constructor() {
    const persistedId = this.readPersistedId();
    if (persistedId !== null) {
      this.companyId.set(persistedId);
      this.loadProfile(persistedId)
        .pipe(
          take(1),
          catchError(() => {
            this.clearSession();
            return of(null);
          }),
        )
        .subscribe();
    }
  }

  signUp(payload: SignUpRealStateCompanyDto): Observable<RealStateCompany> {
    return this.runRequest(
      this.signUpUseCase.execute(payload).pipe(tap(company => this.handleCompany(company))),
    );
  }

  signIn(payload: SignInRealStateCompanyDto): Observable<RealStateCompany> {
    return this.runRequest(
      this.signInUseCase.execute(payload).pipe(
        switchMap(id => this.getByIdUseCase.execute(id)),
        tap(company => this.handleCompany(company)),
      ),
    );
  }

  loadProfile(id: number): Observable<RealStateCompany> {
    return this.runRequest(
      this.getByIdUseCase.execute(id).pipe(tap(company => this.handleCompany(company))),
    );
  }

  updateProfile(payload: UpdateRealStateCompanyDto): Observable<RealStateCompany> {
    const id = this.companyId();
    if (id === null) {
      const error = new Error('No hay una inmobiliaria autenticada.');
      this.error.set(error.message);
      return throwError(() => error);
    }

    return this.runRequest(
      this.updateUseCase.execute(id, payload).pipe(tap(company => this.handleCompany(company))),
    );
  }

  signOut(): void {
    this.clearSession();
  }

  private runRequest<T>(source: Observable<T>): Observable<T> {
    this.loading.set(true);
    this.error.set(null);
    return source.pipe(catchError(err => this.handleError(err)), finalize(() => this.loading.set(false)));
  }

  private handleCompany(company: RealStateCompany): RealStateCompany {
    this.company.set(company);
    this.companyId.set(company.id);
    this.persistId(company.id);
    return company;
  }

  private handleError(error: unknown) {
    this.error.set(this.extractErrorMessage(error));
    return throwError(() => error);
  }

  private extractErrorMessage(error: unknown): string {
    if (!error) {
      return 'Ocurrió un error inesperado.';
    }

    if (typeof error === 'string') {
      return error;
    }

    if (typeof error === 'object') {
      const maybeError = error as { message?: unknown; error?: unknown };

      if (maybeError.error && typeof maybeError.error === 'object') {
        const nested = (maybeError.error as { message?: unknown }).message;
        if (typeof nested === 'string' && nested.trim().length > 0) {
          return nested;
        }
      }

      if (typeof maybeError.message === 'string' && maybeError.message.trim().length > 0) {
        return maybeError.message;
      }
    }

    return 'Ocurrió un error inesperado.';
  }

  private clearSession(): void {
    this.company.set(null);
    this.companyId.set(null);
    this.error.set(null);
    if (this.canUseStorage()) {
      window.localStorage.removeItem(this.storageKey);
    }
  }

  private persistId(id: number): void {
    if (this.canUseStorage()) {
      window.localStorage.setItem(this.storageKey, String(id));
    }
  }

  private readPersistedId(): number | null {
    if (!this.canUseStorage()) {
      return null;
    }

    const raw = window.localStorage.getItem(this.storageKey);
    if (!raw) {
      return null;
    }

    const parsed = Number.parseInt(raw, 10);
    return Number.isNaN(parsed) ? null : parsed;
  }

  private canUseStorage(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }
}
