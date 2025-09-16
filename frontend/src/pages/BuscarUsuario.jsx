import { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function BuscarUsuario() {
  const [uuid, setUuid] = useState('');
  const [usuario, setUsuario] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleBuscar = async (e) => {
    e.preventDefault();
    setMensagem('');
    setUsuario(null);

    try {
      const token = localStorage.getItem('token');
      const response = await api.get(`/usuario/${uuid}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsuario(response.data);
    } catch (err) {
      setMensagem('Usuário não encontrado ou erro no servidor');
    }
  };

  const handleExcluir = async () => {
    try {
      const token = localStorage.getItem('token');
      await api.delete(`/usuario/${uuid}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMensagem('Usuário excluído com sucesso!');
      setUsuario(null);
    } catch (err) {
      setMensagem('Erro ao excluir usuário');
    }
  };

  const handleEditar = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await api.put(
        `/usuario/${uuid}`,
        {
          nome: usuario.nome,
          email: usuario.email,
          senha: usuario.senha,
          nivelDeAcesso: usuario.nivelDeAcesso
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setMensagem('Usuário atualizado com sucesso!');
    } catch (err) {
      setMensagem('Erro ao atualizar usuário');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto' }}>
      <h2>Buscar Usuário</h2>
      <form onSubmit={handleBuscar} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Digite o UUID"
          value={uuid}
          onChange={(e) => setUuid(e.target.value)}
          required
        />
        <button type="submit">Buscar</button>
      </form>

      {mensagem && <p>{mensagem}</p>}

      {usuario && (
        <form onSubmit={handleEditar} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input
            type="text"
            value={usuario.nome}
            onChange={(e) => setUsuario({ ...usuario, nome: e.target.value })}
          />
          <input
            type="email"
            value={usuario.email}
            onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
          />
          <input
            type="password"
            value={usuario.senha}
            onChange={(e) => setUsuario({ ...usuario, senha: e.target.value })}
          />
          <input
            type="text"
            value={usuario.nivelDeAcesso}
            onChange={(e) => setUsuario({ ...usuario, nivelDeAcesso: e.target.value })}
          />

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button type="submit">Salvar Alterações</button>
            <button type="button" onClick={handleExcluir} style={{ background: 'red', color: 'white' }}>
              Excluir Usuário
            </button>
            <button type="button" onClick={() => navigate('/usuarios')}>
              Voltar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
