import { useNavigate } from 'react-router-dom';

export default function Usuarios() {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', textAlign: 'center' }}>
      <h1>Gerenciamento de Usuários</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '30px' }}>
        <button onClick={() => navigate('/usuarios/cadastrar')}>Cadastrar Usuário</button>
        <button onClick={() => navigate('/usuarios/buscar')}>Buscar Usuários</button>
      </div>
    </div>
  );
}
