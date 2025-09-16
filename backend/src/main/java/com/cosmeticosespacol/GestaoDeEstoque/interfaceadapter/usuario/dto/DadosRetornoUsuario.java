package com.cosmeticosespacol.GestaoDeEstoque.interfaceadapter.usuario.dto;

import java.util.UUID;

public record DadosRetornoUsuario(UUID uuid, String nome, String email, String nivelDeAcesso) {
}
