package com.acme.finanzasbackend.iam.application.internal.commandservices;

import com.acme.finanzasbackend.iam.application.internal.outboundingservices.hashing.HashingService;
import com.acme.finanzasbackend.iam.domain.model.aggregates.RealStateCompany;
import com.acme.finanzasbackend.iam.domain.model.commands.SignInCommand;
import com.acme.finanzasbackend.iam.domain.model.commands.SignUpCommand;
import com.acme.finanzasbackend.iam.domain.model.commands.UpdateRealStateCompanyCommand;
import com.acme.finanzasbackend.iam.domain.services.RealStateCompanyCommandService;
import com.acme.finanzasbackend.iam.infrastructure.persistence.jpa.repositories.RealStateCompanyRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RealStateCompanyCommandServiceImpl implements RealStateCompanyCommandService {
    private final RealStateCompanyRepository realStateCompanyRepository;
    private final HashingService hashingService;

    public RealStateCompanyCommandServiceImpl(RealStateCompanyRepository realStateCompanyRepository, HashingService hashingService) {
        this.realStateCompanyRepository = realStateCompanyRepository;
        this.hashingService = hashingService;
    }

    @Override
    public Long handle(SignUpCommand command) {
        if (realStateCompanyRepository.existsByUsername(command.username())) {
            throw new IllegalArgumentException("Username already exists");
        }
        var hashedPassword = hashingService.encode(command.password());
        var realStateCompany = new RealStateCompany(command.companyName(), command.username(), hashedPassword, command.ruc(), command.email(), command.phoneNumber());
        realStateCompanyRepository.save(realStateCompany);
        return realStateCompany.getId();
    }

    @Override
    public Long handle(SignInCommand command) {
        Optional<RealStateCompany> realStateCompanyOptional = realStateCompanyRepository.findByUsername(command.username());
        if (realStateCompanyOptional.isEmpty()) {
            throw new IllegalArgumentException("Invalid credentials");
        }
        var realStateCompany = realStateCompanyOptional.get();
        if (!hashingService.matches(command.password(), realStateCompany.getPassword())) {
            throw new IllegalArgumentException("Invalid credentials");
        }
        return realStateCompany.getId();
    }

    @Override
    public Long handle(UpdateRealStateCompanyCommand command) {
        var realStateCompany = realStateCompanyRepository.findById(command.id())
                .orElseThrow(() -> new IllegalArgumentException("Real State Company not found"));
        realStateCompany.updateInformation(command.companyName(), command.username(), command.ruc(), command.email(), command.phoneNumber());
        realStateCompanyRepository.save(realStateCompany);
        return realStateCompany.getId();
    }
}
