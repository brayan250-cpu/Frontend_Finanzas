import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

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
    realStateCompanyId: 1,
  };

  class GetAllClientsUseCaseStub {
    loading = signal(false);
    execute = jasmine.createSpy('execute').and.returnValue(of([mockClient]));
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsPageComponent],
      providers: [
        { provide: GetAllClientsUseCase, useClass: GetAllClientsUseCaseStub },
        provideNoopAnimations(),
      ],
    }).compileComponents();
  });

  it('maps clients into primitive table rows and triggers the initial load', () => {
    const fixture = TestBed.createComponent(ClientsPageComponent);
    const component = fixture.componentInstance;
    const useCase = TestBed.inject(GetAllClientsUseCase) as unknown as GetAllClientsUseCaseStub;

    fixture.detectChanges();

    expect(useCase.execute).toHaveBeenCalledWith(1);

    const tableRow = component.tableData()[0];

    expect(tableRow.document).toBe(mockClient.document.value);
    expect(tableRow.createdAt).toContain('2024');
  });
});
