package com.acme.finanzasbackend.iam.infrastructure.services.hashing;

import com.acme.finanzasbackend.iam.application.internal.outboundingservices.hashing.HashingService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class BCryptHashingService implements HashingService {
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Override
    public String encode(String input) {
        return encoder.encode(input);
    }

    @Override
    public boolean matches(String raw, String encoded) {
        return encoder.matches(raw, encoded);
    }
}
