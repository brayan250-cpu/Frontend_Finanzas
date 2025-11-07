import { Observable } from 'rxjs';
import {
  RealStateCompany,
  SignInRealStateCompanyDto,
  SignUpRealStateCompanyDto,
  UpdateRealStateCompanyDto,
} from '../../domain/real-state-company';

export abstract class RealStateCompanyRepository {
  abstract signUp(payload: SignUpRealStateCompanyDto): Observable<RealStateCompany>;
  abstract signIn(payload: SignInRealStateCompanyDto): Observable<number>;
  abstract getById(id: number): Observable<RealStateCompany>;
  abstract update(id: number, payload: UpdateRealStateCompanyDto): Observable<RealStateCompany>;
}
