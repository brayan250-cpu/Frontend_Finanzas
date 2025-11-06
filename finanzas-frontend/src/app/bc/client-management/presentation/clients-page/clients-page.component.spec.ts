import { TestBed } from '@angular/core/testing';
import { ClientsPageComponent } from './clients-page.component';
import { GetAllClientsUseCase } from '../../application/use-cases/get-all-clients.usecase';
import { Client } from '../../domain/client';

describe('ClientsPageComponent', () => {
  const mockClient: Client = {
    id: { value: '1' },
    fullName: 'Ada Lovelace',
    document: { value: '12345678' },
    email: 'ada@example.com',
    createdAt: new Date('2024-01-05T00:00:00Z'),
  };

  class GetAllClientsUseCaseStub {
    execute = jasmine.createSpy('execute').and.resolveTo([mockClient]);
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsPageComponent],
      providers: [{ provide: GetAllClientsUseCase, useClass: GetAllClientsUseCaseStub }],
    }).compileComponents();
  });

  it('maps clients into primitive table rows', async () => {
    const fixture = TestBed.createComponent(ClientsPageComponent);
    const component = fixture.componentInstance;

    await fixture.whenStable();

    const tableRow = component.tableData()[0];

    expect(tableRow.document).toBe(mockClient.document.value);
    expect(tableRow.createdAt).toContain('2024');
  });
});
