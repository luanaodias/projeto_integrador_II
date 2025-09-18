import { useState } from 'react';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';

export default function BuscarUsuario() {
  const [filtro, setFiltro] = useState('uuid');
  const [valorBusca, setValorBusca] = useState('');
  const [usuario, setUsuario] = useState(null);
  const [editando, setEditando] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleBuscar = async (e) => {
    e.preventDefault();
    setMensagem('');
    setUsuario(null);
    setEditando(false);

    try {
      const token = localStorage.getItem('token');
      let response;

      if (filtro === 'uuid') {
        response = await api.get(`/usuario/${valorBusca}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        response = await api.get(`/usuario?email=${valorBusca}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setUsuario(response.data);
    } catch (err) {
      setMensagem('❌ Usuário não encontrado ou erro no servidor');
    }
  };

  const handleExcluir = async () => {
    try {
      const token = localStorage.getItem('token');
      await api.delete(`/usuario/${usuario.uuid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMensagem('✅ Usuário excluído com sucesso!');
      setUsuario(null);
      setEditando(false);
    } catch (err) {
      setMensagem('❌ Erro ao excluir usuário');
    }
  };

  const handleEditar = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await api.put(
        `/usuario/${usuario.uuid}`,
        {
          nome: usuario.nome,
          email: usuario.email,
          senha: usuario.senha,
          nivelDeAcesso: usuario.nivelDeAcesso,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMensagem('✅ Usuário atualizado com sucesso!');
      setEditando(false);
    } catch (err) {
      setMensagem('❌ Erro ao atualizar usuário');
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          padding: '40px',
          borderRadius: '16px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
          width: '100%',
          maxWidth: '500px',
          color: '#222',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#222' }}>
          Buscar/Editar Usuário
        </h2>

        {/* Form de busca (esconde no modo edição) */}
        {!editando && (
          <form
            onSubmit={handleBuscar}
            style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}
          >
            <select
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '14px',
                backgroundColor: '#f9f9f9',
                color: '#333',
                cursor: 'pointer',
              }}
            >
              <option value="uuid">Buscar por UUID</option>
              <option value="email">Buscar por Email</option>
            </select>

            <input
              type="text"
              placeholder={filtro === 'uuid' ? 'Digite o UUID' : 'Digite o Email'}
              value={valorBusca}
              onChange={(e) => setValorBusca(e.target.value)}
              required
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '14px',
                backgroundColor: '#f9f9f9',
                color: '#333',
              }}
            />
            <button
              type="submit"
              style={{
                padding: '12px 20px',
                backgroundColor: '#6a11cb',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: '0.3s',
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#4b0f9c')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#6a11cb')}
            >
              Buscar
            </button>
          </form>
        )}

        {mensagem && (
          <p
            style={{
              textAlign: 'center',
              color: mensagem.startsWith('✅') ? 'green' : 'red',
              fontWeight: 'bold',
              marginBottom: '20px',
            }}
          >
            {mensagem}
          </p>
        )}

        {/* Resultado da busca */}
        {usuario && !editando && (
          <div style={{ marginBottom: '20px' }}>
            <p><b>Nome:</b> {usuario.nome}</p>
            <p><b>Email:</b> {usuario.email}</p>
            <p><b>Nível de Acesso:</b> {usuario.nivelDeAcesso}</p>

            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
              <button
                type="button"
                onClick={() => setEditando(true)}
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: '#6a11cb',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                Editar
              </button>

              <button
                type="button"
                onClick={handleExcluir}
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: 'red',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                Excluir
              </button>
            </div>
          </div>
        )}

        {/* Form de edição no estilo CadastrarUsuario */}
        {usuario && editando && (
          <form
            onSubmit={handleEditar}
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontWeight: 'bold', color: '#333' }}>Nome</label>
              <input
                type="text"
                value={usuario.nome}
                onChange={(e) => setUsuario({ ...usuario, nome: e.target.value })}
                required
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  fontSize: '14px',
                  backgroundColor: '#f9f9f9',
                  color: '#333',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontWeight: 'bold', color: '#333' }}>Email</label>
              <input
                type="email"
                value={usuario.email}
                onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
                required
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  fontSize: '14px',
                  backgroundColor: '#f9f9f9',
                  color: '#333',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontWeight: 'bold', color: '#333' }}>Senha</label>
              <input
                type="password"
                value={usuario.senha || ''}
                onChange={(e) => setUsuario({ ...usuario, senha: e.target.value })}
                placeholder="Digite a nova senha"
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  fontSize: '14px',
                  backgroundColor: '#f9f9f9',
                  color: '#333',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontWeight: 'bold', color: '#333' }}>Nível de Acesso</label>
              <select
                value={usuario.nivelDeAcesso}
                onChange={(e) => setUsuario({ ...usuario, nivelDeAcesso: e.target.value })}
                required
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  fontSize: '14px',
                  backgroundColor: '#f9f9f9',
                  color: '#333',
                  cursor: 'pointer',
                }}
              >
                <option value="VENDEDOR">VENDEDOR</option>
                <option value="GERENTE">GERENTE</option>
                <option value="ADMINISTRADOR">ADMINISTRADOR</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button
                type="submit"
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: '#6a11cb',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = '#5932a6')}
                onMouseOut={(e) => (e.target.style.backgroundColor = '#6a11cb')}
              >
                Salvar Alterações
              </button>

              <button
                type="button"
                onClick={() => setEditando(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: '#555',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = '#333')}
                onMouseOut={(e) => (e.target.style.backgroundColor = '#555')}
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        {/* Botão voltar só fora da edição */}
        {!editando && (
          <button
            type="button"
            onClick={() => navigate('/usuarios')}
            style={{
              marginTop: '20px',
              width: '100%',
              padding: '12px',
              backgroundColor: '#555',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#333')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#555')}
          >
            Voltar
          </button>
        )}
      </div>
    </div>
  );
}
