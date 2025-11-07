import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { GetAllClientsUseCase } from '../../application/use-cases/get-all-clients.usecase';
import { Client } from '../../domain/client';

@Component({
  standalone: true,
  selector: 'app-clients-page',
  imports: [CommonModule],
  template: `
    <section class="clients">
      <h1>Clients</h1>
      <ul>
        <li *ngFor="let client of clients()">
          <strong>{{ client.firstName }} {{ client.lastName }}</strong>
          <span>— {{ client.email }}</span>
          <span *ngIf="client.phone"> · {{ client.phone }}</span>
        </li>
      </ul>
    </section>
  `,
})
export class ClientsPageComponent {
  private readonly getAllClients = inject(GetAllClientsUseCase);
  readonly clients = signal<Client[]>([]);

  constructor() {
    this.loadClients();
  }

  private async loadClients(): Promise<void> {
    const list = await this.getAllClients.execute();
    this.clients.set(list);
  }
}
