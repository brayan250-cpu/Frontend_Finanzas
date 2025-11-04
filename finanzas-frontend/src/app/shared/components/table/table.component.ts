import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  standalone: true,
  selector: 'app-table',
  imports: [MatTableModule, NgFor],
  template: `
  <table mat-table [dataSource]="data">
    <ng-container *ngFor="let col of columns" [matColumnDef]="col">
      <th mat-header-cell *matHeaderCellDef>{{ col | titlecase }}</th>
      <td mat-cell *matCellDef="let row">{{ row[col] }}</td>
    </ng-container>
    <tr mat-header-row *matHeaderRowDef="columns"></tr>
    <tr mat-row *matRowDef="let row; columns: columns;"></tr>
  </table>
  `,
})
export class TableComponent {
  @Input() columns: string[] = [];
  @Input() data: any[] = [];
}
