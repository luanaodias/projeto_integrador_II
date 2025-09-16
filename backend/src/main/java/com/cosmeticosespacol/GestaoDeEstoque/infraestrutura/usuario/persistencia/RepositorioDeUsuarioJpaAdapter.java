package com.cosmeticosespacol.GestaoDeEstoque.infraestrutura.usuario.persistencia;

import com.cosmeticosespacol.GestaoDeEstoque.aplicacao.usuario.repositorio.RepositorioDeUsuario;
import com.cosmeticosespacol.GestaoDeEstoque.dominio.usuario.Usuario;
import com.cosmeticosespacol.GestaoDeEstoque.infraestrutura.usuario.entidade.UsuarioEntidade;
import com.cosmeticosespacol.GestaoDeEstoque.infraestrutura.usuario.mapper.UsuarioJpaMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Component
public class RepositorioDeUsuarioJpaAdapter implements RepositorioDeUsuario, UserDetailsService {

    private final RepositorioDeUsuarioJpa repositorio;

    @Autowired
    public RepositorioDeUsuarioJpaAdapter(RepositorioDeUsuarioJpa repositorio) {
        this.repositorio = repositorio;
    }

    @Transactional
    @Override
    public Usuario salvarUsuario(Usuario usuario) {
        UsuarioEntidade entidade = UsuarioJpaMapper.paraEntidade(usuario);
        return UsuarioJpaMapper.paraDominio(repositorio.save(entidade));
    }

    @Transactional(readOnly = true)
    @Override
    public boolean validarEmail(String email) {
        return repositorio.validarEmail(email);
    }

    @Transactional(readOnly = true)
    @Override
    public Optional<Usuario> buscarUsuarioPorUuid(UUID uuid) {
        return repositorio.findById(uuid).map(UsuarioJpaMapper::paraDominio);
    }

    @Transactional(readOnly = true)
    @Override
    public Optional<Usuario> buscarUsuarioPorEmail(String email) {
        return repositorio.findByEmail(email).map(UsuarioJpaMapper::paraDominio);
    }

    @Transactional
    @Override
    public void deletarUsuarioPorUuid(UUID uuid) {
        repositorio.deleteById(uuid);
    }

    @Transactional(readOnly = true)
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return UsuarioJpaMapper.paraEntidade(buscarUsuarioPorEmail(username).get());
    }
}
