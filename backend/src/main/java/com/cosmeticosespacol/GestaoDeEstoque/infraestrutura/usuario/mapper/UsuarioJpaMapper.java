package com.cosmeticosespacol.GestaoDeEstoque.infraestrutura.usuario.mapper;

import com.cosmeticosespacol.GestaoDeEstoque.dominio.usuario.Usuario;
import com.cosmeticosespacol.GestaoDeEstoque.infraestrutura.usuario.entidade.UsuarioEntidade;

public class UsuarioJpaMapper {

    public static Usuario paraDominio(UsuarioEntidade entidade) {
        return new Usuario(entidade.getUuid(), entidade.getNome(), entidade.getEmail(), entidade.getSenha(),
                entidade.getNivelDeAcesso());
    }

    public static UsuarioEntidade paraEntidade(Usuario dominio) {
        return new UsuarioEntidade(dominio.getUuid(), dominio.getNome(), dominio.getEmail(), dominio.getSenha(),
                dominio.getNivelDeAcesso());
    }
}
