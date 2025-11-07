export interface RealStateCompany {
  id: number;
  companyName: string;
  username: string;
  ruc: string;
  email: string;
  phoneNumber: string;
}

export interface SignUpRealStateCompanyDto {
  companyName: string;
  username: string;
  password: string;
  ruc: string;
  email: string;
  phoneNumber: string;
}

export interface SignInRealStateCompanyDto {
  username: string;
  password: string;
}

export interface UpdateRealStateCompanyDto {
  companyName: string;
  username: string;
  ruc: string;
  email: string;
  phoneNumber: string;
}
