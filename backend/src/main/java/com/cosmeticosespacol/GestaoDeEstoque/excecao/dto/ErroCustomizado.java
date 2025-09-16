package com.cosmeticosespacol.GestaoDeEstoque.excecao.dto;

import java.time.Instant;

public record ErroCustomizado(Instant timestamp, Integer status, String error, String path) {
}
