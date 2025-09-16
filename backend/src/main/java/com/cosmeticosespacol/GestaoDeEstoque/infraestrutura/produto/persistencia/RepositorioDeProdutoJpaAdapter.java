package com.cosmeticosespacol.GestaoDeEstoque.infraestrutura.produto.persistencia;

import com.cosmeticosespacol.GestaoDeEstoque.aplicacao.produto.repositorio.RepositorioDeProduto;
import com.cosmeticosespacol.GestaoDeEstoque.dominio.produto.Categoria;
import com.cosmeticosespacol.GestaoDeEstoque.dominio.produto.Produto;
import com.cosmeticosespacol.GestaoDeEstoque.infraestrutura.produto.entidade.ProdutoEntidade;
import com.cosmeticosespacol.GestaoDeEstoque.infraestrutura.produto.mapper.ProdutoJpaMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
public class RepositorioDeProdutoJpaAdapter implements RepositorioDeProduto {

    private final RepositorioDeProdutoJpa repositorio;

    @Autowired
    public RepositorioDeProdutoJpaAdapter(RepositorioDeProdutoJpa repositorio) {
        this.repositorio = repositorio;
    }

    @Transactional
    @Override
    public Produto salvarProduto(Produto novoProduto) {
        ProdutoEntidade entidade = ProdutoJpaMapper.paraEntidade(novoProduto);
        return ProdutoJpaMapper.paraDominio(repositorio.save(entidade));
    }

    @Transactional(readOnly = true)
    @Override
    public boolean validarNome(String nome) {
        return repositorio.validarNome(nome);
    }

    @Transactional(readOnly = true)
    @Override
    public Optional<Produto> buscarProdutoPorUuid(UUID uuid) {
        return repositorio.findById(uuid).map(ProdutoJpaMapper::paraDominio);
    }

    @Transactional(readOnly = true)
    @Override
    public List<Produto> buscarProdutosFiltrados(String nome, Categoria categoria) {
        return repositorio.filtrarPorNomeECategoria(nome, categoria).stream().map(ProdutoJpaMapper::paraDominio).toList();
    }

    @Transactional
    @Override
    public void deletarProdutoPorUuid(UUID uuid) {
        repositorio.deleteById(uuid);
    }
}
