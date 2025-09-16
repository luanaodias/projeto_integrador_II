package com.cosmeticosespacol.GestaoDeEstoque.infraestrutura.produto.persistencia;

import com.cosmeticosespacol.GestaoDeEstoque.dominio.produto.Categoria;
import com.cosmeticosespacol.GestaoDeEstoque.infraestrutura.produto.entidade.ProdutoEntidade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface RepositorioDeProdutoJpa extends JpaRepository<ProdutoEntidade, UUID> {

    @Query(nativeQuery = true, value = "SELECT EXISTS (SELECT 1 FROM tb_produto WHERE nome = :nome)")
    boolean validarNome(String nome);

    @Query(nativeQuery = true, value = "SELECT * FROM tb_produto " +
            "WHERE (:nome IS NULL OR UPPER(nome) LIKE UPPER(CONCAT('%', :nome, '%'))) " +
            "AND (:categoria IS NULL OR categoria = :categoria)")
    List<ProdutoEntidade> filtrarPorNomeECategoria(String nome, Categoria categoria);
}
