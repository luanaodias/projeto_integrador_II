package com.cosmeticosespacol.GestaoDeEstoque.excecao;

public class NaoEncontradoExcecao extends RuntimeException{
    public NaoEncontradoExcecao(String msg) {
        super(msg);
    }
}
