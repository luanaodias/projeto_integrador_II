package com.cosmeticosespacol.GestaoDeEstoque.aplicacao.seguranca;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.cosmeticosespacol.GestaoDeEstoque.dominio.usuario.Usuario;
import com.cosmeticosespacol.GestaoDeEstoque.excecao.TokenExcecao;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class ServiceDeToken {

    @Value("${api.security.token.secret}")
    private String secret;

    public String gerarToken(Usuario usuario) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.create()
                    .withIssuer("token-generator")
                    .withSubject(usuario.getEmail())
                    .withClaim("role", usuario.getNivelDeAcesso().name())
                    .withExpiresAt(gerarTempoDeExpiracao())
                    .sign(algorithm);
        } catch (JWTCreationException e) {
            throw new TokenExcecao("Erro gerando token!");
        }
    }

    public String validarToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm).withIssuer("token-generator").build().verify(token).getSubject();
        } catch (JWTVerificationException e) {
            throw new TokenExcecao("Erro validando token!");
        }
    }

    private Instant gerarTempoDeExpiracao() {
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
    }

    public DecodedJWT decodificarToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm).withIssuer("token-generator").build().verify(token);
        } catch (JWTVerificationException e) {
            throw new TokenExcecao("Erro ao decodificar token!");
        }
    }
}
