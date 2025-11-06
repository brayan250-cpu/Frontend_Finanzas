// cspell:ignore usecase titlecase
import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { catchError, distinctUntilChanged, filter, startWith, switchMap } from 'rxjs/operators';

import { GetAllClientsUseCase } from '../../application/use-cases/get-all-clients.usecase';
import { TableComponent } from '../../../../shared/ui/table/table.component';
import { Client } from '../../domain/client';

@Component({
  standalone: true,
  selector: 'app-clients-page',
  imports: [
    TableComponent,
    ReactiveFormsModule,
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  template: `
    <section class="page">
      <h1>Clientes</h1>

      <form class="filters" autocomplete="off">
        <mat-form-field appearance="outline">
          <mat-label>ID inmobiliaria</mat-label>
          <input matInput type="number" min="1" [formControl]="companyIdControl" />
        </mat-form-field>
        <button mat-raised-button color="primary" type="button" (click)="reload()">
          Buscar
        </button>
      </form>

      <p *ngIf="loading()">Cargando clientes...</p>

      <app-table [columns]="columns" [data]="tableData()"></app-table>
    </section>
  `,
  styles: [
    `
      .filters {
        display: flex;
        align-items: flex-end;
        gap: 1rem;
        margin-bottom: 1.5rem;
      }

      mat-form-field {
        width: 12rem;
      }

      p {
        margin: 0 0 1rem;
      }
    `,
  ],
})
export class ClientsPageComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly getAll = inject(GetAllClientsUseCase);

  readonly loading = this.getAll.loading;
  readonly clients = signal<Client[]>([]);
  readonly columns = ['fullName', 'document', 'email', 'createdAt'];
  readonly companyIdControl = new FormControl<number>(1, { nonNullable: true });

  readonly tableData = computed(() =>
    this.clients().map(client => ({
      fullName: client.fullName,
      document: client.document.value,
      email: client.email ?? '',
      createdAt: this.formatDate(client.createdAt),
    })),
  );

  constructor() {
    this.setupAutoReload();
  }

  reload(): void {
    const value = this.companyIdControl.value;
    if (value > 0) {
      this.fetchClients(value);
    }
  }

  private setupAutoReload(): void {
    this.companyIdControl.valueChanges
      .pipe(
        startWith(this.companyIdControl.value),
        filter(id => id > 0),
        distinctUntilChanged(),
        switchMap(id => this.getAll.execute(id).pipe(catchError(() => of([])))),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(clients => this.clients.set(clients));
  }

  private fetchClients(realStateCompanyId: number): void {
    this.getAll
      .execute(realStateCompanyId)
      .pipe(
        catchError(() => of([])),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(clients => this.clients.set(clients));
  }

  private formatDate(date: Date): string {
    if (!date) {
      return '';
    }

    const value = date instanceof Date ? date : new Date(date);
    return Number.isNaN(value.getTime())
      ? ''
      : new Intl.DateTimeFormat('es-PE', { dateStyle: 'medium' }).format(value);
  }
}
