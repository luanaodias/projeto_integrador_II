package com.cosmeticosespacol.GestaoDeEstoque.excecao.dto;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

public record ErroCustomizadoValidaEntradaDados(Instant timestamp, Integer status, String error, String path,
                                                List<CampoMensagem> errors) {

    public ErroCustomizadoValidaEntradaDados {
        errors = (errors == null) ? new ArrayList<>() : errors;
    }

    public void addError(String campo, String mensagem) {
        errors.removeIf(error -> error.campo().equals(campo));
        errors.add(new CampoMensagem(campo, mensagem));
    }
}
