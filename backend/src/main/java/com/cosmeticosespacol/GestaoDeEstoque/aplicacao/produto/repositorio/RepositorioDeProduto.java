package com.cosmeticosespacol.GestaoDeEstoque.aplicacao.produto.repositorio;

import com.cosmeticosespacol.GestaoDeEstoque.dominio.produto.Categoria;
import com.cosmeticosespacol.GestaoDeEstoque.dominio.produto.Produto;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface RepositorioDeProduto {

    Produto salvarProduto(Produto produto);

    boolean validarNome(String nome);

    Optional<Produto> buscarProdutoPorUuid(UUID uuid);

    List<Produto> buscarProdutosFiltrados(String nome, Categoria categoria);

    void deletarProdutoPorUuid(UUID uuid);
}
