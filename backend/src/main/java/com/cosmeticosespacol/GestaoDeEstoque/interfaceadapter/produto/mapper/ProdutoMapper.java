package com.cosmeticosespacol.GestaoDeEstoque.interfaceadapter.produto.mapper;

import com.cosmeticosespacol.GestaoDeEstoque.dominio.produto.Categoria;
import com.cosmeticosespacol.GestaoDeEstoque.dominio.produto.Produto;
import com.cosmeticosespacol.GestaoDeEstoque.interfaceadapter.produto.dto.DadosEntradaProduto;
import com.cosmeticosespacol.GestaoDeEstoque.interfaceadapter.produto.dto.DadosRetornoProduto;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class ProdutoMapper {

    public static Produto paraDominio(DadosEntradaProduto dto) {
        return new Produto(null, dto.nome(), Categoria.valueOf(dto.categoria()), dto.descricao(),
                dto.preco(), dto.quantidade(), dto.desconto());
    }

    public static DadosRetornoProduto paraDto(Produto dominio) {
        BigDecimal desconto = dominio.getDesconto().setScale(2, RoundingMode.HALF_UP);
        BigDecimal preco = dominio.getPreco().setScale(2, RoundingMode.HALF_UP);

        if (desconto.compareTo(BigDecimal.ZERO) != 0) {
            preco = dominio.getPrecoComDesconto().setScale(2, RoundingMode.HALF_UP);
        }

        return new DadosRetornoProduto(dominio.getUuid().toString(), dominio.getNome(),
                dominio.getCategoria().toString(),
                dominio.getDescricao(), preco, dominio.getQuantidade(),
                dominio.getDesconto().setScale(2, RoundingMode.HALF_UP));
    }
}
