package com.acme.finanzasbackend.iam.interfaces.rest.controllers;

import com.acme.finanzasbackend.iam.domain.model.commands.SignInCommand;
import com.acme.finanzasbackend.iam.domain.model.commands.SignUpCommand;
import com.acme.finanzasbackend.iam.domain.model.commands.UpdateRealStateCompanyCommand;
import com.acme.finanzasbackend.iam.domain.model.queries.GetRealStateCompanyByIdQuery;
import com.acme.finanzasbackend.iam.domain.services.RealStateCompanyCommandService;
import com.acme.finanzasbackend.iam.domain.services.RealStateCompanyQueryService;
import com.acme.finanzasbackend.iam.interfaces.rest.resources.RealStateCompanyResource;
import com.acme.finanzasbackend.iam.interfaces.rest.resources.SignInResource;
import com.acme.finanzasbackend.iam.interfaces.rest.resources.SignUpResource;
import com.acme.finanzasbackend.iam.interfaces.rest.resources.UpdateRealStateCompanyResource;
import com.acme.finanzasbackend.iam.interfaces.rest.transform.RealStateCompanyResourceFromEntityAssembler;
import com.acme.finanzasbackend.iam.interfaces.rest.transform.SignInCommandFromResourceAssembler;
import com.acme.finanzasbackend.iam.interfaces.rest.transform.SignUpCommandFromResourceAssembler;
import com.acme.finanzasbackend.iam.interfaces.rest.transform.UpdateRealStateCompanyCommandFromResourceAssembler;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/real-state-company")
public class RealStateCompanyController {
    private final RealStateCompanyCommandService realStateCompanyCommandService;
    private final RealStateCompanyQueryService realStateCompanyQueryService;

    public RealStateCompanyController(RealStateCompanyCommandService realStateCompanyCommandService, RealStateCompanyQueryService realStateCompanyQueryService) {
        this.realStateCompanyCommandService = realStateCompanyCommandService;
        this.realStateCompanyQueryService = realStateCompanyQueryService;
    }

    @PostMapping("/sign-up")
    public ResponseEntity<RealStateCompanyResource> signUp(@RequestBody SignUpResource resource) {
        SignUpCommand command = SignUpCommandFromResourceAssembler.toCommandFromResource(resource);
        Long id = realStateCompanyCommandService.handle(command);
        var company = realStateCompanyQueryService.handle(new GetRealStateCompanyByIdQuery(id));
        RealStateCompanyResource companyResource = RealStateCompanyResourceFromEntityAssembler.toResourceFromEntity(company);
        return ResponseEntity.ok(companyResource);
    }

    @PostMapping("/sign-in")
    public ResponseEntity<Long> signIn(@RequestBody SignInResource resource) {
        SignInCommand command = SignInCommandFromResourceAssembler.toCommandFromResource(resource);
        Long id = realStateCompanyCommandService.handle(command);
        return ResponseEntity.ok(id);
    }

    @GetMapping("/{realStateCompanyId}")
    public ResponseEntity<RealStateCompanyResource> getById(@PathVariable Long realStateCompanyId) {
        var company = realStateCompanyQueryService.handle(new GetRealStateCompanyByIdQuery(realStateCompanyId));
        RealStateCompanyResource resource = RealStateCompanyResourceFromEntityAssembler.toResourceFromEntity(company);
        return ResponseEntity.ok(resource);
    }

    @PutMapping("/{realStateCompanyId}")
    public ResponseEntity<RealStateCompanyResource> update(@PathVariable Long realStateCompanyId,
                                                           @RequestBody UpdateRealStateCompanyResource resource) {
        UpdateRealStateCompanyCommand command = UpdateRealStateCompanyCommandFromResourceAssembler.toCommandFromResource(realStateCompanyId, resource);
        Long id = realStateCompanyCommandService.handle(command);
        var company = realStateCompanyQueryService.handle(new GetRealStateCompanyByIdQuery(id));
        RealStateCompanyResource companyResource = RealStateCompanyResourceFromEntityAssembler.toResourceFromEntity(company);
        return ResponseEntity.ok(companyResource);
    }
}
