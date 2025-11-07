package com.acme.finanzasbackend.iam.domain.model.commands;

public record SignUpCommand(String companyName, String username, String password, String ruc, String email, String phoneNumber) { }
