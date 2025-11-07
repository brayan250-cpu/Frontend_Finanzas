package com.acme.finanzasbackend.iam.interfaces.rest.resources;

public record SignUpResource(String companyName, String username, String password, String ruc, String email, String phoneNumber) { }
