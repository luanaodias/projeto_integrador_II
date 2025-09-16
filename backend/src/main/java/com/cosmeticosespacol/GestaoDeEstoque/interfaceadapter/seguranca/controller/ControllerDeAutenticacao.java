package com.cosmeticosespacol.GestaoDeEstoque.interfaceadapter.seguranca.controller;

import com.cosmeticosespacol.GestaoDeEstoque.aplicacao.seguranca.ServiceDeToken;
import com.cosmeticosespacol.GestaoDeEstoque.infraestrutura.usuario.entidade.UsuarioEntidade;
import com.cosmeticosespacol.GestaoDeEstoque.infraestrutura.usuario.mapper.UsuarioJpaMapper;
import com.cosmeticosespacol.GestaoDeEstoque.interfaceadapter.seguranca.dto.DadosLogin;
import com.cosmeticosespacol.GestaoDeEstoque.interfaceadapter.seguranca.dto.RetornoLogin;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/login")
@Tag(name = "Autenticação", description = "Controller para autenticação")
public class ControllerDeAutenticacao {

    private final AuthenticationManager authenticationManager;

    private final ServiceDeToken serviceDeToken;

    @Autowired
    public ControllerDeAutenticacao(AuthenticationManager authenticationManager, ServiceDeToken serviceDeToken) {
        this.authenticationManager = authenticationManager;
        this.serviceDeToken = serviceDeToken;
    }

    @Operation(description = "Realiza login do usuário", summary = "Login")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Login realizado com sucesso", content = @Content(schema = @Schema(implementation = RetornoLogin.class))),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content)})
    @PostMapping(produces = "application/json")
    public ResponseEntity<RetornoLogin> login(@RequestBody @Valid DadosLogin dto) {
        UsernamePasswordAuthenticationToken usernamePassword = new UsernamePasswordAuthenticationToken(dto.email(),
                dto.senha());
        Authentication auth = authenticationManager.authenticate(usernamePassword);
        String token = serviceDeToken.gerarToken(UsuarioJpaMapper.paraDominio((UsuarioEntidade) auth.getPrincipal()));
        return ResponseEntity.ok().body(new RetornoLogin(token));
    }
}
