package com.cosmeticosespacol.GestaoDeEstoque.aplicacao.usuario.service;

import com.cosmeticosespacol.GestaoDeEstoque.aplicacao.usuario.repositorio.RepositorioDeUsuario;
import com.cosmeticosespacol.GestaoDeEstoque.dominio.usuario.Usuario;
import com.cosmeticosespacol.GestaoDeEstoque.excecao.DadoRepetidoExcecao;
import com.cosmeticosespacol.GestaoDeEstoque.excecao.NaoEncontradoExcecao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ServiceDeUsuario {

    private final RepositorioDeUsuario repositorio;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public ServiceDeUsuario(RepositorioDeUsuario repositorio, PasswordEncoder passwordEncoder) {
        this.repositorio = repositorio;
        this.passwordEncoder = passwordEncoder;
    }

    public Usuario cadastrarNovoUsuario(Usuario novoUsuario) {
        if (repositorio.validarEmail(novoUsuario.getEmail())) {
            throw new DadoRepetidoExcecao("Já existe usuário com esse e-mail!");
        }
        novoUsuario.setSenha(passwordEncoder.encode(novoUsuario.getSenha()));
        return repositorio.salvarUsuario(novoUsuario);
    }

    public Usuario filtrarPorUuid(UUID uuid) {
        return repositorio.buscarUsuarioPorUuid(uuid)
                .orElseThrow(() -> new NaoEncontradoExcecao("Usuário não encontrado!"));
    }

    public Usuario filtrarPorEmail(String email) {
        return repositorio.buscarUsuarioPorEmail(email)
                .orElseThrow(() -> new NaoEncontradoExcecao("Usuário não encontrado!"));
    }

    public Usuario atualizarUsuario(UUID uuid, Usuario usuarioAtualizado) {
        Usuario dominio = filtrarPorUuid(uuid);
        dominio.setNome(usuarioAtualizado.getNome());
        dominio.setEmail(usuarioAtualizado.getEmail());
        dominio.setSenha(passwordEncoder.encode(usuarioAtualizado.getSenha()));
        dominio.setNivelDeAcesso(usuarioAtualizado.getNivelDeAcesso());
        return repositorio.salvarUsuario(dominio);
    }

    public String deletarUsuarioPorUuid(UUID uuid) {
        filtrarPorUuid(uuid);
        repositorio.deletarUsuarioPorUuid(uuid);
        return "Usuário deletado com sucesso!";
    }
}
