// cspell:ignore usecase titlecase
import { Component, computed, inject, signal } from '@angular/core';
import { GetAllClientsUseCase } from '../../application/use-cases/get-all-clients.usecase';
import { TableComponent } from '../../../../shared/ui/table/table.component';
import { Client } from '../../domain/client';

@Component({
  standalone: true,
  selector: 'app-clients-page',
  imports: [TableComponent],
  template: `
    <section class="page">
    <h1>Clientes</h1>
    <app-table [columns]="columns" [data]="tableData()"></app-table>
    </section>
  `,
})
export class ClientsPageComponent {
  private getAll = inject(GetAllClientsUseCase);
  clients = signal<Client[]>([]);
  columns = ['fullName','document','email','createdAt'];
  tableData = computed(() =>
    this.clients().map(client => ({
      fullName: client.fullName,
      document: client.document.value,
      email: client.email ?? '',
      createdAt: this.formatDate(client.createdAt),
    })),
  );

  constructor() { this.load(); }

  private async load() {
    const data = await this.getAll.execute();
    this.clients.set(data);
  }

  private formatDate(date: Date): string {
    if (!date) { return ''; }
    const value = date instanceof Date ? date : new Date(date);
    return Number.isNaN(value.getTime()) ? '' : new Intl.DateTimeFormat('es-PE', { dateStyle: 'medium' }).format(value);
  }
}
