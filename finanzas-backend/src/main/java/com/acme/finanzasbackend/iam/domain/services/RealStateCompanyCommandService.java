package com.acme.finanzasbackend.iam.domain.services;

import com.acme.finanzasbackend.iam.domain.model.commands.SignInCommand;
import com.acme.finanzasbackend.iam.domain.model.commands.SignUpCommand;
import com.acme.finanzasbackend.iam.domain.model.commands.UpdateRealStateCompanyCommand;

public interface RealStateCompanyCommandService {
    Long handle(SignUpCommand command);
    Long handle(SignInCommand command);
    Long handle(UpdateRealStateCompanyCommand command);
}
