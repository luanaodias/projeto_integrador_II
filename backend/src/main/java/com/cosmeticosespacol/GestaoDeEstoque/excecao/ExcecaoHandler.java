package com.cosmeticosespacol.GestaoDeEstoque.excecao;

import com.cosmeticosespacol.GestaoDeEstoque.excecao.dto.ErroCustomizado;
import com.cosmeticosespacol.GestaoDeEstoque.excecao.dto.ErroCustomizadoValidaEntradaDados;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.Instant;
import java.util.ArrayList;

@ControllerAdvice
public class ExcecaoHandler {

    @ExceptionHandler(NaoEncontradoExcecao.class)
    public ResponseEntity<ErroCustomizado> entidadeNaoEncontrada(NaoEncontradoExcecao e,
                                                                 HttpServletRequest request) {
        HttpStatus status = HttpStatus.NOT_FOUND;
        ErroCustomizado err = new ErroCustomizado(Instant.now(), status.value(), e.getMessage(),
                request.getRequestURI());
        return ResponseEntity.status(status).body(err);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErroCustomizado> illegalArgumentException(IllegalArgumentException e,
                                                                    HttpServletRequest request) {
        HttpStatus status = HttpStatus.UNPROCESSABLE_ENTITY;
        ErroCustomizado err = new ErroCustomizado(Instant.now(), status.value(), e.getMessage(),
                request.getRequestURI());
        return ResponseEntity.status(status).body(err);
    }

    @ExceptionHandler(DadoRepetidoExcecao.class)
    public ResponseEntity<ErroCustomizado> illegalArgumentException(DadoRepetidoExcecao e,
                                                                    HttpServletRequest request) {
        HttpStatus status = HttpStatus.CONFLICT;
        ErroCustomizado err = new ErroCustomizado(Instant.now(), status.value(), e.getMessage(),
                request.getRequestURI());
        return ResponseEntity.status(status).body(err);
    }

    @ExceptionHandler(TokenExcecao.class)
    public ResponseEntity<ErroCustomizado> token(TokenExcecao e, HttpServletRequest request) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        ErroCustomizado err = new ErroCustomizado(Instant.now(), status.value(), e.getMessage(),
                request.getRequestURI());
        return ResponseEntity.status(status).body(err);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErroCustomizadoValidaEntradaDados> methodArgumentNotValid(MethodArgumentNotValidException e,
                                                                                    HttpServletRequest request) {
        HttpStatus status = HttpStatus.UNPROCESSABLE_ENTITY;
        ErroCustomizadoValidaEntradaDados err = new ErroCustomizadoValidaEntradaDados(Instant.now(), status.value(),
                "Campo inválido!", request.getRequestURI(), new ArrayList<>());

        for (FieldError f : e.getBindingResult().getFieldErrors()) {
            err.addError(f.getField(), f.getDefaultMessage());
        }

        return ResponseEntity.status(status).body(err);
    }
}
