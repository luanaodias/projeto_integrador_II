package com.cosmeticosespacol.GestaoDeEstoque.infraestrutura.usuario.persistencia;

import com.cosmeticosespacol.GestaoDeEstoque.infraestrutura.usuario.entidade.UsuarioEntidade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface RepositorioDeUsuarioJpa extends JpaRepository<UsuarioEntidade, UUID> {

    @Query(nativeQuery = true, value = "SELECT EXISTS (SELECT 1 FROM tb_usuario WHERE email = :email)")
    boolean validarEmail(String email);

    Optional<UsuarioEntidade> findByEmail(String email);
}
