package com.acme.finanzasbackend.iam.infrastructure.persistence.jpa.repositories;

import com.acme.finanzasbackend.iam.domain.model.aggregates.RealStateCompany;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RealStateCompanyRepository extends JpaRepository<RealStateCompany, Long> {
    boolean existsByUsername(String username);
    Optional<RealStateCompany> findByUsername(String username);
}
