package com.acme.finanzasbackend.iam.domain.model.commands;

public record UpdateRealStateCompanyCommand(Long id, String companyName, String username, String ruc, String email, String phoneNumber) { }
