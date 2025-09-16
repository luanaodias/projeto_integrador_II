package com.cosmeticosespacol.GestaoDeEstoque.dominio.produto;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.UUID;

public class Produto {

    private final UUID uuid;
    private String nome;
    private Categoria categoria;
    private String descricao;
    private BigDecimal preco;
    private BigDecimal precoComDesconto;
    private Integer quantidade;
    private BigDecimal desconto;

    public Produto(UUID uuid, String nome, Categoria categoria, String descricao, BigDecimal preco, Integer quantidade,
                   BigDecimal desconto) {

        if (nome == null || nome.isBlank()) {
            throw new IllegalArgumentException("Nome deve ser preenchido!");
        }

        if (categoria == null) {
            throw new IllegalArgumentException("Categoria deve ser preenchida!");
        }

        if (preco == null || preco.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Preço inválido!");
        }

        if (quantidade == null || quantidade < 0.0) {
            throw new IllegalArgumentException("Quantidade inválida!");
        }

        if (desconto == null || desconto.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Desconto inválido!");
        }

        this.uuid = uuid;
        this.nome = nome;
        this.categoria = categoria;
        this.descricao = descricao;
        this.preco = preco;
        this.quantidade = quantidade;
        this.desconto = desconto.setScale(2, RoundingMode.HALF_UP);
        this.precoComDesconto = preco.multiply(
                        BigDecimal.ONE.subtract(desconto.divide(BigDecimal.valueOf(100), 6, RoundingMode.HALF_UP)))
                .setScale(2, RoundingMode.HALF_UP);
    }

    public UUID getUuid() {
        return uuid;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        if (nome == null || nome.isBlank()) {
            throw new IllegalArgumentException("Nome deve ser preenchido!");
        }
        this.nome = nome;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        if (categoria == null) {
            throw new IllegalArgumentException("Categoria deve ser preenchida!");
        }
        this.categoria = categoria;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        if (nome == null) {
            throw new IllegalArgumentException("Descrição não pode ser nula!");
        }
        this.descricao = descricao;
    }

    public BigDecimal getPreco() {
        return preco;
    }

    public void setPreco(BigDecimal preco) {
        if (preco == null || preco.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Preço inválido!");
        }
        this.preco = preco.setScale(2, RoundingMode.HALF_UP);
        this.precoComDesconto = preco.multiply(
                        BigDecimal.ONE.subtract(this.desconto.divide(BigDecimal.valueOf(100), 6, RoundingMode.HALF_UP)))
                .setScale(2, RoundingMode.HALF_UP);
    }

    public BigDecimal getPrecoComDesconto() {
        return precoComDesconto;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void adicionarEstoque(Integer quantidade) {
        if (quantidade == null || quantidade < 0) {
            throw new IllegalArgumentException("Quantidade inválida!");
        }
        this.quantidade += quantidade;
    }

    public void removerEstoque(Integer quantidade) {
        if (quantidade == null || quantidade > this.quantidade) {
            throw new IllegalArgumentException("Quantidade inválida!");
        }
        this.quantidade -= quantidade;
    }

    public BigDecimal getDesconto() {
        return desconto;
    }

    public void atualizarDesconto(BigDecimal desconto) {
        if (desconto == null || desconto.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Desconto inválido!");
        }
        this.desconto = desconto.setScale(2, RoundingMode.HALF_UP);
        this.precoComDesconto = this.preco.multiply(
                        BigDecimal.ONE.subtract(this.desconto.divide(BigDecimal.valueOf(100), 6, RoundingMode.HALF_UP)))
                .setScale(2, RoundingMode.HALF_UP);
    }
}
