package com.acme.finanzasbackend.iam.domain.model.aggregates;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "real_state_companies")
@Getter
@NoArgsConstructor
public class RealStateCompany {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String companyName;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String ruc;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String phoneNumber;

    public RealStateCompany(String companyName, String username, String password, String ruc, String email, String phoneNumber) {
        this.companyName = companyName;
        this.username = username;
        this.password = password;
        this.ruc = ruc;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }

    public void updateInformation(String companyName, String username, String ruc, String email, String phoneNumber) {
        this.companyName = companyName;
        this.username = username;
        this.ruc = ruc;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }
}
