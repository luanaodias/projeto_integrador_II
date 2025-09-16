package com.cosmeticosespacol.GestaoDeEstoque.interfaceadapter.usuario.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record DadosEntradaUsuario(@NotBlank(message = "Campo obrigatório") String nome, @Email(message = "Deve ter formado de e-mail válido!") String email, @NotBlank(message = "Campo obrigatório") String senha, @NotBlank(message = "Campo obrigatório") String nivelDeAcesso) {
}
