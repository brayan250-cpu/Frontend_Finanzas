package com.acme.finanzasbackend.iam.domain.services;

import com.acme.finanzasbackend.iam.domain.model.aggregates.RealStateCompany;
import com.acme.finanzasbackend.iam.domain.model.queries.GetRealStateCompanyByIdQuery;

public interface RealStateCompanyQueryService {
    RealStateCompany handle(GetRealStateCompanyByIdQuery query);
}
