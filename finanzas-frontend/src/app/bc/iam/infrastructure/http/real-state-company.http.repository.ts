import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import {
  RealStateCompany,
  SignInRealStateCompanyDto,
  SignUpRealStateCompanyDto,
  UpdateRealStateCompanyDto,
} from '../../domain/real-state-company';
import { RealStateCompanyRepository } from '../../application/ports/real-state-company.repository';

interface RealStateCompanyDto {
  id: number;
  companyName: string;
  username: string;
  ruc: string;
  email: string;
  phoneNumber: string;
}

@Injectable({ providedIn: 'root' })
export class RealStateCompanyHttpRepository implements RealStateCompanyRepository {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/real-state-company`;

  signUp(payload: SignUpRealStateCompanyDto): Observable<RealStateCompany> {
    return this.http
      .post<RealStateCompanyDto>(`${this.baseUrl}/sign-up`, payload)
      .pipe(map(dto => this.toDomain(dto)));
  }

  signIn(payload: SignInRealStateCompanyDto): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/sign-in`, payload);
  }

  getById(id: number): Observable<RealStateCompany> {
    return this.http
      .get<RealStateCompanyDto>(`${this.baseUrl}/${id}`)
      .pipe(map(dto => this.toDomain(dto)));
  }

  update(id: number, payload: UpdateRealStateCompanyDto): Observable<RealStateCompany> {
    return this.http
      .put<RealStateCompanyDto>(`${this.baseUrl}/${id}`, payload)
      .pipe(map(dto => this.toDomain(dto)));
  }

  private toDomain(dto: RealStateCompanyDto): RealStateCompany {
    return {
      id: dto.id,
      companyName: dto.companyName,
      username: dto.username,
      ruc: dto.ruc,
      email: dto.email,
      phoneNumber: dto.phoneNumber,
    };
  }
}
