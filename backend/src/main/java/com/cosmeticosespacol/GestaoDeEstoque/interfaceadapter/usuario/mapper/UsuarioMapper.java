package com.cosmeticosespacol.GestaoDeEstoque.interfaceadapter.usuario.mapper;

import com.cosmeticosespacol.GestaoDeEstoque.dominio.usuario.NivelDeAcesso;
import com.cosmeticosespacol.GestaoDeEstoque.dominio.usuario.Usuario;
import com.cosmeticosespacol.GestaoDeEstoque.interfaceadapter.usuario.dto.DadosEntradaUsuario;
import com.cosmeticosespacol.GestaoDeEstoque.interfaceadapter.usuario.dto.DadosRetornoUsuario;

public class UsuarioMapper {

    public static Usuario paraDominio(DadosEntradaUsuario dto) {
        return new Usuario(null, dto.nome(), dto.email(), dto.senha(), NivelDeAcesso.valueOf(dto.nivelDeAcesso()));
    }

    public static DadosRetornoUsuario paraDto(Usuario dominio) {
        return new DadosRetornoUsuario(dominio.getUuid(), dominio.getNome(), dominio.getEmail(),
                dominio.getNivelDeAcesso().toString());
    }
}
