import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', textAlign: 'center' }}>
      <h1>Dashboard</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '30px' }}>
        <button onClick={() => navigate('/usuarios')}>Gerenciar Usuários</button>
        <button onClick={() => navigate('/produtos')}>Gerenciar Produtos</button>
      </div>
    </div>
  );
}
