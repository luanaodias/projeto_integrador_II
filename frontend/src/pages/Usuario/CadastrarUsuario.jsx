import { useState } from 'react';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';

export default function CadastrarUsuario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nivelDeAcesso, setNivelDeAcesso] = useState('VENDEDOR');
  const [mensagem, setMensagem] = useState('');

  const navigate = useNavigate();

  const inputStyle = {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '14px',
    backgroundColor: '#fff',
    color: '#333',
    width: '100%',
  };

  const labelStyle = {
    fontWeight: 'bold',
    marginBottom: '6px',
    display: 'block',
    color: '#333',
  };

  const formGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');

    try {
      const token = localStorage.getItem('token');
      await api.post(
        '/usuario',
        { nome, email, senha, nivelDeAcesso },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMensagem('✅ Usuário cadastrado com sucesso!');
      setTimeout(() => navigate('/usuarios'), 1500);
    } catch (err) {
      if (err.response) {
        setMensagem(`❌ Erro: ${err.response.data.mensagem || 'Falha ao cadastrar usuário'}`);
      } else {
        setMensagem('❌ Erro de conexão com o servidor');
      }
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
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#333' }}>
          Cadastrar Usuário
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              style={inputStyle}
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              style={inputStyle}
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Nível de Acesso</label>
            <select
              value={nivelDeAcesso}
              onChange={(e) => setNivelDeAcesso(e.target.value)}
              required
              style={{ ...inputStyle, cursor: 'pointer' }}
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
                backgroundColor: '#6f42c1',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#5932a6')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#6f42c1')}
            >
              Cadastrar
            </button>

            <button
              type="button"
              onClick={() => navigate('/usuarios')}
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

        {mensagem && (
          <p
            style={{
              marginTop: '20px',
              textAlign: 'center',
              color: mensagem.startsWith('✅') ? 'green' : 'red',
              fontWeight: 'bold',
            }}
          >
            {mensagem}
          </p>
        )}
      </div>
    </div>
  );
}
