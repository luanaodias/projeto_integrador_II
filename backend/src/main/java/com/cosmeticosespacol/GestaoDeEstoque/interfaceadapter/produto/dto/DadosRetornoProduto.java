package com.cosmeticosespacol.GestaoDeEstoque.interfaceadapter.produto.dto;

import java.math.BigDecimal;

public record DadosRetornoProduto(String uuid, String nome, String categoria, String descricao, BigDecimal preco,
                                  Integer quantidade, BigDecimal desconto) {
}
