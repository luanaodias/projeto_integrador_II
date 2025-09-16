package com.cosmeticosespacol.GestaoDeEstoque.interfaceadapter.produto.controller;

import com.cosmeticosespacol.GestaoDeEstoque.aplicacao.produto.service.ServiceDeProduto;
import com.cosmeticosespacol.GestaoDeEstoque.dominio.produto.Categoria;
import com.cosmeticosespacol.GestaoDeEstoque.dominio.produto.Produto;
import com.cosmeticosespacol.GestaoDeEstoque.excecao.dto.ErroCustomizado;
import com.cosmeticosespacol.GestaoDeEstoque.interfaceadapter.produto.dto.DadosEntradaProduto;
import com.cosmeticosespacol.GestaoDeEstoque.interfaceadapter.produto.dto.DadosRetornoProduto;
import com.cosmeticosespacol.GestaoDeEstoque.interfaceadapter.dto.MensagemDeSucesso;
import com.cosmeticosespacol.GestaoDeEstoque.interfaceadapter.produto.mapper.ProdutoMapper;
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

import java.math.BigDecimal;
import java.net.URI;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/produto")
@Tag(name = "Produto", description = "Controller para produto")
public class ControllerDeProduto {

    private final ServiceDeProduto service;

    @Autowired
    public ControllerDeProduto(ServiceDeProduto service) {
        this.service = service;
    }

    @Operation(description = "Cadastra novo produto", summary = "Cadastrar produto")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Produto cadastrado com sucesso", content = @Content(schema = @Schema(implementation = DadosRetornoProduto.class))),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema(implementation = ErroCustomizado.class))),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content),
            @ApiResponse(responseCode = "409", description = "Conflict", content = @Content(schema = @Schema(implementation = ErroCustomizado.class))),
            @ApiResponse(responseCode = "422", description = "Unprocessable Entity", content = @Content(schema = @Schema(implementation = ErroCustomizado.class)))})
    @PostMapping(produces = "application/json")
    public ResponseEntity<DadosRetornoProduto> cadastrarProduto(@RequestBody @Valid DadosEntradaProduto dadosEntradaProduto) {
        Produto dominio = service.cadastrarNovoProduto(ProdutoMapper.paraDominio(dadosEntradaProduto));
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{uuid}").buildAndExpand(dominio.getUuid())
                .toUri();
        return ResponseEntity.created(uri).body(ProdutoMapper.paraDto(dominio));
    }

    @Operation(description = "Retorna produto filtrado por uuid", summary = "Filtrar por uuid")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Produto retornado com sucesso", content = @Content(schema = @Schema(implementation = DadosRetornoProduto.class))),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema(implementation = ErroCustomizado.class))),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content(schema = @Schema(implementation = ErroCustomizado.class)))})
    @GetMapping(value = "/{uuid}", produces = "application/json")
    public ResponseEntity<DadosRetornoProduto> filtrarProdutoPorUuid(@PathVariable UUID uuid) {
        Produto dominio = service.filtrarPorUuid(uuid);
        return ResponseEntity.ok().body(ProdutoMapper.paraDto(dominio));
    }

    @Operation(description = "Retorna lista de produtos filtrados por nome e/ou categoria", summary = "Retorna produtos filtrados")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Produtos retornados com sucesso"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema(implementation = ErroCustomizado.class))),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content(schema = @Schema(implementation = ErroCustomizado.class)))})
    @GetMapping(produces = "application/json")
    public ResponseEntity<List<DadosRetornoProduto>> retornarProdutosFiltrados(@RequestParam(required = false) String nome,
                                                                               @RequestParam(required = false) Categoria categoria) {
        List<Produto> dominio = service.retornarProdutosFiltrados(nome, categoria);
        return ResponseEntity.ok().body(dominio.stream().map(ProdutoMapper::paraDto).toList());
    }

    @Operation(description = "Atualiza os dados do produto", summary = "Atualizar produto")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Produto atualizado com sucesso", content = @Content(schema = @Schema(implementation = DadosRetornoProduto.class))),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema(implementation = ErroCustomizado.class))),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content(schema = @Schema(implementation = ErroCustomizado.class))),
            @ApiResponse(responseCode = "403", description = "Forbidden"),
            @ApiResponse(responseCode = "422", description = "Unprocessable Entity", content = @Content(schema = @Schema(implementation = ErroCustomizado.class)))})
    @PutMapping(value = "/{uuid}", produces = "application/json")
    public ResponseEntity<DadosRetornoProduto> atualizarProduto(@PathVariable UUID uuid,
                                                                @RequestBody @Valid DadosEntradaProduto dadosEntradaProduto) {
        Produto dominio = service.atualizarProduto(uuid, ProdutoMapper.paraDominio(dadosEntradaProduto));
        return ResponseEntity.ok().body(ProdutoMapper.paraDto(dominio));
    }

    @Operation(description = "Aumenta quantidade de um produto filtrado por uuid", summary = "Adicionar estoque por uuid")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Quantidade do produto atualizada com sucesso", content = @Content(schema = @Schema(implementation = MensagemDeSucesso.class))),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema(implementation = ErroCustomizado.class))),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content(schema = @Schema(implementation = ErroCustomizado.class)))})
    @PatchMapping(value = "/darEntrada/{uuid}", produces = "application/json")
    public ResponseEntity<MensagemDeSucesso> aumentarQuantidadePorUuid(@PathVariable UUID uuid,
                                                                       @RequestParam Integer quantidade) {
        MensagemDeSucesso mensagem = new MensagemDeSucesso(service.aumentarQuantidadeDeProduto(uuid, quantidade));
        return ResponseEntity.ok().body(mensagem);
    }

    @Operation(description = "Diminui quantidade de um produto filtrado por uuid", summary = "Diminuir estoque por uuid")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Quantidade do produto atualizada com sucesso", content = @Content(schema = @Schema(implementation = MensagemDeSucesso.class))),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema(implementation = ErroCustomizado.class))),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content(schema = @Schema(implementation = ErroCustomizado.class)))})
    @PatchMapping(value = "/darSaida/{uuid}", produces = "application/json")
    public ResponseEntity<MensagemDeSucesso> diminuirQuantidadePorUuid(@PathVariable UUID uuid,
                                                                       @RequestParam Integer quantidade) {
        MensagemDeSucesso mensagem = new MensagemDeSucesso(service.diminuirQuantidadeDeProduto(uuid, quantidade));
        return ResponseEntity.ok().body(mensagem);
    }

    @Operation(description = "Atualiza o desconto de um produto filtrado por uuid", summary = "Desconto por uuid")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Desconto do produto atualizado com sucesso", content = @Content(schema = @Schema(implementation = MensagemDeSucesso.class))),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema(implementation = ErroCustomizado.class))),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content(schema = @Schema(implementation = ErroCustomizado.class)))})
    @PatchMapping(value = "/desconto/{uuid}", produces = "application/json")
    public ResponseEntity<MensagemDeSucesso> atualizaDescontoPorUuid(@PathVariable UUID uuid,
                                                                     @RequestParam BigDecimal desconto) {
        MensagemDeSucesso mensagem = new MensagemDeSucesso(service.adicionarDescontoPorUuid(uuid, desconto));
        return ResponseEntity.ok().body(mensagem);
    }

    @Operation(description = "Atualiza o desconto de produtos filtrados por nome e/ou categoria", summary = "Desconto filtrado")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Desconto dos produtos atualizado com sucesso", content = @Content(schema = @Schema(implementation = MensagemDeSucesso.class))),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema(implementation = ErroCustomizado.class))),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content(schema = @Schema(implementation = ErroCustomizado.class)))})
    @PatchMapping(value = "/desconto", produces = "application/json")
    public ResponseEntity<MensagemDeSucesso> atualizaDescontoFiltrado(@RequestParam(required = false) String nome,
                                                                      @RequestParam(required = false) Categoria categoria,
                                                                      @RequestParam BigDecimal desconto) {
        MensagemDeSucesso mensagem = new MensagemDeSucesso(
                service.adicionarDescontoFiltrado(nome, categoria, desconto));
        return ResponseEntity.ok().body(mensagem);
    }

    @Operation(description = "Deleta produto por uuid", summary = "Deletar produto")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Produto excluido com sucesso", content = @Content(schema = @Schema(implementation = MensagemDeSucesso.class))),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema(implementation = ErroCustomizado.class))),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content(schema = @Schema(implementation = ErroCustomizado.class)))})
    @DeleteMapping(value = "/{uuid}", produces = "application/json")
    public ResponseEntity<MensagemDeSucesso> deletarProdutoPorUuid(@PathVariable UUID uuid) {
        MensagemDeSucesso mensagem = new MensagemDeSucesso(service.deletarProdutoPorUuid(uuid));
        return ResponseEntity.ok().body(mensagem);
    }
}
