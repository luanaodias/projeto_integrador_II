package com.cosmeticosespacol.GestaoDeEstoque.interfaceadapter.seguranca.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record DadosLogin(@Email(message = "Deve ter formato de e-mail válido!") String email, @NotBlank(message = "Campo obrigatório") String senha) {
}
