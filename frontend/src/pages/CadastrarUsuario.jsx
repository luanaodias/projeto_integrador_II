import { useState } from 'react';
import api from '../api/api'; // seu axios configurado
import { useNavigate } from 'react-router-dom';

export default function CadastrarUsuario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nivelDeAcesso, setNivelDeAcesso] = useState('');
  const [mensagem, setMensagem] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');

    try {
      const token = localStorage.getItem('token'); // pega o JWT do login
      const response = await api.post(
        '/usuario',
        { nome, email, senha, nivelDeAcesso },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setMensagem('Usuário cadastrado com sucesso!');
      // Redireciona de volta para a tela de usuários
      setTimeout(() => navigate('/usuarios'), 1500);
    } catch (err) {
      if (err.response) {
        setMensagem(`Erro: ${err.response.data.mensagem || 'Falha ao cadastrar usuário'}`);
      } else {
        setMensagem('Erro de conexão com o servidor');
      }
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto' }}>
      <h2>Cadastrar Usuário</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Nível de Acesso (ex: ADMINISTRADOR, GERENTE)"
          value={nivelDeAcesso}
          onChange={(e) => setNivelDeAcesso(e.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
      {mensagem && <p style={{ marginTop: '20px' }}>{mensagem}</p>}
    </div>
  );
}
