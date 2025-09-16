package com.cosmeticosespacol.GestaoDeEstoque.dominio.usuario;

import java.util.Objects;
import java.util.UUID;

public class Usuario {

    private final UUID uuid;
    private String nome;
    private String email;
    private String senha;
    private NivelDeAcesso nivelDeAcesso;

    public Usuario(UUID uuid, String nome, String email, String senha, NivelDeAcesso nivelDeAcesso) {

        if (nome == null || nome.isBlank()) {
            throw new IllegalArgumentException("Nome deve ser preenchido!");
        }

        if (email == null || email.isBlank()) {
            throw new IllegalArgumentException("E-mail deve ser preenchido!");
        }

        if (senha == null || senha.isBlank()) {
            throw new IllegalArgumentException("Senha deve ser preenchida!");
        }

        if (nivelDeAcesso == null) {
            throw new IllegalArgumentException("Nivel de acesso deve ser preenchido!");
        }

        this.uuid = uuid;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.nivelDeAcesso = nivelDeAcesso;
    }

    public UUID getUuid() {
        return uuid;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        if (nome == null || nome.isBlank()) {
            throw new IllegalArgumentException("Nome deve ser preenchido!");
        }
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        if (email == null || email.isBlank()) {
            throw new IllegalArgumentException("E-mail deve ser preenchido!");
        }
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        if (senha == null || senha.isBlank()) {
            throw new IllegalArgumentException("Senha deve ser preenchida!");
        }
        this.senha = senha;
    }

    public NivelDeAcesso getNivelDeAcesso() {
        return nivelDeAcesso;
    }

    public void setNivelDeAcesso(NivelDeAcesso nivelDeAcesso) {
        if (nivelDeAcesso == null) {
            throw new IllegalArgumentException("Nivel de acesso deve ser preenchido!");
        }
        this.nivelDeAcesso = nivelDeAcesso;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Usuario usuario = (Usuario) o;
        return Objects.equals(uuid, usuario.uuid);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(uuid);
    }

    @Override
    public String toString() {
        return "Usuario{" +
                "uuid=" + uuid +
                ", nome='" + nome + '\'' +
                ", email='" + email + '\'' +
                ", nivelDeAcesso=" + nivelDeAcesso +
                '}';
    }
}
