import { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  

// Dentro do componente Login
const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  try {
    localStorage.removeItem('token');
    const response = await api.post('/login', { email, senha });
    const token = response.data.token;
    localStorage.setItem('token', token);
    navigate('/dashboard'); // redireciona para a dashboard
  } catch (err) {
    if (err.response?.status === 401) {
      setError('Email ou senha incorretos');
    } else {
      setError('Erro no servidor, tente novamente');
    }
  }
};


  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>Senha:</label>
          <input 
            type="password" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" style={{ marginTop: '20px' }}>Entrar</button>
      </form>
    </div>
  );
}
