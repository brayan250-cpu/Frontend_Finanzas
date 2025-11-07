package com.acme.finanzasbackend.iam.application.internal.outboundingservices.hashing;

public interface HashingService {
    String encode(String input);
    boolean matches(String raw, String encoded);
}
