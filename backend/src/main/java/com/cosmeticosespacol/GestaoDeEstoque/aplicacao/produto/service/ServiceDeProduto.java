package com.cosmeticosespacol.GestaoDeEstoque.aplicacao.produto.service;

import com.cosmeticosespacol.GestaoDeEstoque.aplicacao.produto.repositorio.RepositorioDeProduto;
import com.cosmeticosespacol.GestaoDeEstoque.dominio.produto.Categoria;
import com.cosmeticosespacol.GestaoDeEstoque.dominio.produto.Produto;
import com.cosmeticosespacol.GestaoDeEstoque.excecao.DadoRepetidoExcecao;
import com.cosmeticosespacol.GestaoDeEstoque.excecao.NaoEncontradoExcecao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
public class ServiceDeProduto {

    private final RepositorioDeProduto repositorio;

    @Autowired
    public ServiceDeProduto(RepositorioDeProduto repositorioDeProduto) {
        this.repositorio = repositorioDeProduto;
    }

    public Produto cadastrarNovoProduto(Produto novoProduto) {
        if (repositorio.validarNome(novoProduto.getNome())) {
            throw new DadoRepetidoExcecao("Já existe produto com esse nome cadastrado!");
        }
        return repositorio.salvarProduto(novoProduto);
    }

    public Produto filtrarPorUuid(UUID uuid) {
        return repositorio.buscarProdutoPorUuid(uuid)
                .orElseThrow(() -> new NaoEncontradoExcecao("Produto não encontrado!"));
    }

    public List<Produto> retornarProdutosFiltrados(String nome, Categoria categoria) {
        List<Produto> resultado = repositorio.buscarProdutosFiltrados(nome, categoria);
        if (resultado.isEmpty()) {
            throw new NaoEncontradoExcecao("Nenhum produto encontrado!");
        }
        return resultado;
    }

    public Produto atualizarProduto(UUID uuid, Produto produtoAtualizado) {
        Produto dominio = filtrarPorUuid(uuid);
        dominio.setNome(produtoAtualizado.getNome());
        dominio.setCategoria(produtoAtualizado.getCategoria());
        dominio.setDescricao(produtoAtualizado.getDescricao());
        dominio.setPreco(produtoAtualizado.getPreco());
        dominio.atualizarDesconto(produtoAtualizado.getDesconto());
        return repositorio.salvarProduto(dominio);
    }

    public String aumentarQuantidadeDeProduto(UUID uuid, Integer quantidade) {
        Produto dominio = filtrarPorUuid(uuid);
        dominio.adicionarEstoque(quantidade);
        repositorio.salvarProduto(dominio);
        return "Estoque atualizado com sucesso";
    }

    public String diminuirQuantidadeDeProduto(UUID uuid, Integer quantidade) {
        Produto dominio = filtrarPorUuid(uuid);
        dominio.removerEstoque(quantidade);
        repositorio.salvarProduto(dominio);
        return "Estoque atualizado com sucesso";
    }

    public String adicionarDescontoPorUuid(UUID uuid, BigDecimal desconto) {
        Produto dominio = filtrarPorUuid(uuid);
        dominio.atualizarDesconto(desconto);
        repositorio.salvarProduto(dominio);
        return "Desconto atualizado com sucesso";
    }

    public String adicionarDescontoFiltrado(String nome, Categoria categoria, BigDecimal desconto) {
        List<Produto> resultado = retornarProdutosFiltrados(nome, categoria);
        for (Produto produto : resultado) {
            produto.atualizarDesconto(desconto);
            repositorio.salvarProduto(produto);
        }
        return "Desconto atualizado com sucesso";
    }

    public String deletarProdutoPorUuid(UUID uuid) {
        filtrarPorUuid(uuid);
        repositorio.deletarProdutoPorUuid(uuid);
        return "Produto deletado com sucesso";
    }
}
