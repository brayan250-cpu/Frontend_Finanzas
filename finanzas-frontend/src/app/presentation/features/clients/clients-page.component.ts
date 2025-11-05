import { Component, inject, signal } from '@angular/core';
import { GetAllClientsUseCase } from '../../../application/use-cases/get-all-clients.usecase';
import { TableComponent } from '../../../shared/components/table/table.component';
import { Client } from '../../../domain/models/client';

@Component({
  standalone: true,
  selector: 'app-clients-page',
  imports: [TableComponent],
  template: `
    <section class="page">
      <h1>Clientes</h1>
      <app-table [columns]="columns" [data]="clients()"></app-table>
    </section>
  `,
})
export class ClientsPageComponent {
  private getAll = inject(GetAllClientsUseCase);
  clients = signal<Client[]>([]);
  columns = ['fullName','document','email','createdAt'];

  constructor() { this.load(); }

  private async load() {
    const data = await this.getAll.execute();
    this.clients.set(data);
  }
}
