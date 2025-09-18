import { useState } from 'react';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';

export default function AdicionarDescontoFiltrado() {
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [desconto, setDesconto] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [error, setError] = useState('');
  const [sucesso, setSucesso] = useState('');

  const navigate = useNavigate();
  const categorias = ["PERFUME", "CREME", "KIT", "BATOM"];
  const token = localStorage.getItem('token');

  const inputStyle = {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '14px',
    backgroundColor: '#fff',
    color: '#333',
  };

  const handleAplicarDesconto = async () => {
    if (!desconto || parseFloat(desconto) < 0) {
      setError('Informe um valor de desconto válido');
      setSucesso('');
      return;
    }
    setError('');
    setSucesso('');
    try {
      await api.patch(`/produto/desconto?nome=${nome || ''}&categoria=${categoria || ''}&desconto=${desconto}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSucesso(`Desconto de ${desconto}% aplicado com sucesso!`);
      setProdutos(produtos.map(p => ({ ...p, desconto: parseFloat(desconto) })));
    } catch (err) {
      console.error('Erro ao aplicar desconto filtrado:', err);
      setError('Não foi possível aplicar o desconto.');
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
      <style>{`
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>

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
          Adicionar Desconto Filtrado
        </h2>

        {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '20px' }}>{error}</p>}
        {sucesso && <p style={{ color: 'green', textAlign: 'center', marginBottom: '20px' }}>{sucesso}</p>}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Filtrar por nome (opcional)"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            style={inputStyle}
          />
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            style={{ ...inputStyle, cursor: 'pointer' }}
          >
            <option value="">Todas as categorias</option>
            {categorias.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {produtos.length > 0 && (
            <div>
              <h3 style={{ marginBottom: '10px', color: '#333' }}>Produtos encontrados:</h3>
              <ul style={{ maxHeight: '150px', overflowY: 'auto', paddingLeft: '15px' }}>
                {produtos.map(p => (
                  <li key={p.uuid} style={{ marginBottom: '10px', color: '#333' }}>
                    {p.nome} - {p.categoria} - Estoque: {p.quantidade} - Desconto atual: {p.desconto}%
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="number"
              step="any"
              placeholder="Desconto (%)"
              value={desconto}
              onChange={(e) => setDesconto(e.target.value)}
              style={{ ...inputStyle, flex: 1 }}
            />
            <button
              onClick={handleAplicarDesconto}
              style={{
                flex: 1,
                padding: '12px',
                backgroundColor: '#2575fc',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: '0.3s',
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#1a5fd1')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#2575fc')}
            >
              Aplicar Desconto
            </button>
          </div>

          <button
            onClick={() => navigate('/produtos')}
            style={{
              marginTop: '20px',
              padding: '12px',
              width: '100%',
              backgroundColor: '#555',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: '0.3s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#333')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#555')}
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}
