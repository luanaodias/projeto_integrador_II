package com.cosmeticosespacol.GestaoDeEstoque.interfaceadapter.produto.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;

import java.math.BigDecimal;

public record DadosEntradaProduto(@NotBlank(message = "Campo obrigatório") String nome, @NotBlank(message = "Campo obrigatório") String categoria, String descricao, @PositiveOrZero(message = "Campo não pode ser menor que zero!") BigDecimal preco,
                                  @PositiveOrZero(message = "Campo não pode ser menor que zero!") Integer quantidade, @PositiveOrZero(message = "Campo não pode ser menor que zero!") BigDecimal desconto) {
}
