package com.cosmeticosespacol.GestaoDeEstoque.config;

import com.cosmeticosespacol.GestaoDeEstoque.aplicacao.seguranca.ServiceDeToken;
import com.cosmeticosespacol.GestaoDeEstoque.aplicacao.usuario.service.ServiceDeUsuario;
import com.cosmeticosespacol.GestaoDeEstoque.infraestrutura.usuario.mapper.UsuarioJpaMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class SecurityFilter extends OncePerRequestFilter {

    private final ServiceDeToken serviceDeToken;

    private final ServiceDeUsuario serviceDeUsuario;

    @Autowired
    public SecurityFilter(ServiceDeToken serviceDeToken, ServiceDeUsuario serviceDeUsuario) {
        this.serviceDeToken = serviceDeToken;
        this.serviceDeUsuario = serviceDeUsuario;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        var token = recoverToken(request);
        if (token != null) {
            var decodedJWT = serviceDeToken.decodificarToken(token);
            String email = decodedJWT.getSubject();
            String role = decodedJWT.getClaim("role").asString();

            UserDetails user = UsuarioJpaMapper.paraEntidade(serviceDeUsuario.filtrarPorEmail(email));

            var authorities = List.of(new SimpleGrantedAuthority("ROLE_" + role));

            var authentication = new UsernamePasswordAuthenticationToken(user, null, authorities);

            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        filterChain.doFilter(request, response);
    }

    private String recoverToken(HttpServletRequest request) {
        var authHeader = request.getHeader("Authorization");
        if (authHeader == null) return null;
        return authHeader.replace("Bearer ", "");
    }
}
