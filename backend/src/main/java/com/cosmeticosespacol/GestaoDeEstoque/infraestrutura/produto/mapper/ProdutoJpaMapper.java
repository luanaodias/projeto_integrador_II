package com.cosmeticosespacol.GestaoDeEstoque.infraestrutura.produto.mapper;

import com.cosmeticosespacol.GestaoDeEstoque.dominio.produto.Produto;
import com.cosmeticosespacol.GestaoDeEstoque.infraestrutura.produto.entidade.ProdutoEntidade;

public class ProdutoJpaMapper {

    public static Produto paraDominio(ProdutoEntidade entidade) {
        return new Produto(entidade.getUuid(), entidade.getNome(), entidade.getCategoria(), entidade.getDescricao(),
                entidade.getPreco(), entidade.getQuantidade(), entidade.getDesconto());
    }

    public static ProdutoEntidade paraEntidade(Produto dominio) {
        return new ProdutoEntidade(dominio.getUuid(), dominio.getNome(), dominio.getCategoria(), dominio.getDescricao(),
                dominio.getPreco(), dominio.getPrecoComDesconto(), dominio.getQuantidade(), dominio.getDesconto());
    }
}
