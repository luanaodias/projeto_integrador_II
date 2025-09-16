package com.cosmeticosespacol.GestaoDeEstoque.infraestrutura.produto.entidade;

import com.cosmeticosespacol.GestaoDeEstoque.dominio.produto.Categoria;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "tb_produto")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class ProdutoEntidade {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID uuid;
    private String nome;
    private Categoria categoria;
    private String descricao;
    @Column(precision = 10, scale = 2)
    private BigDecimal preco;
    private BigDecimal precoComDesconto;
    private Integer quantidade;
    @Column(precision = 10, scale = 2)
    private BigDecimal desconto;

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        ProdutoEntidade that = (ProdutoEntidade) o;
        return Objects.equals(uuid, that.uuid);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(uuid);
    }
}
