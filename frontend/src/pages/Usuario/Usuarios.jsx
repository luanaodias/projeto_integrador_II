import { useNavigate } from 'react-router-dom';

export default function Usuarios() {
  const navigate = useNavigate();

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
      fontFamily: 'Arial, sans-serif',
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '50px',
        borderRadius: '16px',
        boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
        textAlign: 'center',
        width: '100%',
        maxWidth: '500px',
      }}>
        <h1 style={{ marginBottom: '30px', color: '#333' }}>Gerenciamento de Usuários</h1>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <button 
            onClick={() => navigate('/usuarios/cadastrar')} 
            style={{
              padding: '15px',
              backgroundColor: '#6a11cb',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: '0.3s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#4b0f9c'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#6a11cb'}
          >
            Cadastrar Usuário
          </button>

          <button 
            onClick={() => navigate('/usuarios/buscar')} 
            style={{
              padding: '15px',
              backgroundColor: '#2575fc',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: '0.3s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#1a5fd4'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#2575fc'}
          >
            Buscar Usuários
          </button>

          {/* Botão de voltar */}
          <button 
            onClick={() => navigate('/dashboard')} 
            style={{
              padding: '15px',
              backgroundColor: '#555',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: '0.3s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#333'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#555'}
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}
