import { Component, effect, inject, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { GetAllClientsUseCase } from '../../../application/use-cases/get-all-clients.usecase';
import { TableComponent } from '../../../shared/components/table/table.component';
import { Client } from '../../../domain/models/client';

@Component({
  standalone: true,
  selector: 'app-clients-page',
  imports: [NgIf, TableComponent],
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

  constructor() {
    effect(async () => this.clients.set(await this.getAll.execute()));
  }
}
