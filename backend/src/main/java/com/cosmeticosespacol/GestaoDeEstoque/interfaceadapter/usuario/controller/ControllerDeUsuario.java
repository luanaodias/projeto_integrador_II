package com.cosmeticosespacol.GestaoDeEstoque.interfaceadapter.usuario.controller;

import com.cosmeticosespacol.GestaoDeEstoque.aplicacao.usuario.service.ServiceDeUsuario;
import com.cosmeticosespacol.GestaoDeEstoque.dominio.usuario.Usuario;
import com.cosmeticosespacol.GestaoDeEstoque.excecao.dto.ErroCustomizado;
import com.cosmeticosespacol.GestaoDeEstoque.interfaceadapter.dto.MensagemDeSucesso;
import com.cosmeticosespacol.GestaoDeEstoque.interfaceadapter.usuario.dto.DadosEntradaUsuario;
import com.cosmeticosespacol.GestaoDeEstoque.interfaceadapter.usuario.dto.DadosRetornoUsuario;
import com.cosmeticosespacol.GestaoDeEstoque.interfaceadapter.usuario.mapper.UsuarioMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.UUID;

@RestController
@RequestMapping("/usuario")
@Tag(name = "Usuário", description = "Controller para usuário")
public class ControllerDeUsuario {

    private final ServiceDeUsuario service;

    @Autowired
    public ControllerDeUsuario(ServiceDeUsuario service) {
        this.service = service;
    }

    @Operation(description = "Cadastra novo usuário", summary = "Cadastrar usuário")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Usuário cadastrado com sucesso", content = @Content(schema = @Schema(implementation = DadosRetornoUsuario.class))),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema(implementation = ErroCustomizado.class))),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content),
            @ApiResponse(responseCode = "409", description = "Conflict", content = @Content(schema = @Schema(implementation = ErroCustomizado.class))),
            @ApiResponse(responseCode = "422", description = "Unprocessable Entity", content = @Content(schema = @Schema(implementation = ErroCustomizado.class)))})
    @PostMapping(produces = "application/json")
    public ResponseEntity<DadosRetornoUsuario> cadastrarUsuario(@RequestBody @Valid DadosEntradaUsuario dadosEntradaUsuario) {
        Usuario dominio = service.cadastrarNovoUsuario(UsuarioMapper.paraDominio(dadosEntradaUsuario));
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{uuid}").buildAndExpand(dominio.getUuid())
                .toUri();
        return ResponseEntity.created(uri).body(UsuarioMapper.paraDto(dominio));
    }

    @Operation(description = "Retorna usuário filtrado por uuid", summary = "Filtrar por uuid")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Usuário retornado com sucesso", content = @Content(schema = @Schema(implementation = DadosRetornoUsuario.class))),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema(implementation = ErroCustomizado.class))),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content(schema = @Schema(implementation = ErroCustomizado.class)))})
    @GetMapping(value = "/{uuid}", produces = "application/json")
    public ResponseEntity<DadosRetornoUsuario> filtrarUsuarioPorUuid(@PathVariable UUID uuid) {
        Usuario dominio = service.filtrarPorUuid(uuid);
        return ResponseEntity.ok().body(UsuarioMapper.paraDto(dominio));
    }

    @Operation(description = "Atualiza os dados do usuário", summary = "Atualizar usuário")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Usuário atualizado com sucesso", content = @Content(schema = @Schema(implementation = DadosRetornoUsuario.class))),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema(implementation = ErroCustomizado.class))),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content(schema = @Schema(implementation = ErroCustomizado.class))),
            @ApiResponse(responseCode = "422", description = "Unprocessable Entity", content = @Content(schema = @Schema(implementation = ErroCustomizado.class)))})
    @PutMapping(value = "/{uuid}", produces = "application/json")
    public ResponseEntity<DadosRetornoUsuario> atualizarUsuario(@PathVariable UUID uuid,
                                                                @RequestBody @Valid DadosEntradaUsuario dadosEntradaUsuario) {
        Usuario dominio = service.atualizarUsuario(uuid, UsuarioMapper.paraDominio(dadosEntradaUsuario));
        return ResponseEntity.ok().body(UsuarioMapper.paraDto(dominio));
    }

    @Operation(description = "Deleta usuário por uuid", summary = "Deletar usuário")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Usuário excluido com sucesso", content = @Content(schema = @Schema(implementation = MensagemDeSucesso.class))),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema(implementation = ErroCustomizado.class))),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content(schema = @Schema(implementation = ErroCustomizado.class)))})
    @DeleteMapping(value = "/{uuid}", produces = "application/json")
    public ResponseEntity<MensagemDeSucesso> deletarUsuarioPorUuid(@PathVariable UUID uuid) {
        MensagemDeSucesso mensagem = new MensagemDeSucesso(service.deletarUsuarioPorUuid(uuid));
        return ResponseEntity.ok().body(mensagem);
    }
}
