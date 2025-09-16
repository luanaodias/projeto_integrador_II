import { useState } from 'react';
import api from '../api/api';
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

  // Buscar produtos para visualização antes de aplicar desconto
  const handleBuscar = async (e) => {
    e.preventDefault();
    setError('');
    setSucesso('');
    try {
      const params = {};
      if (nome) params.nome = nome;
      if (categoria) params.categoria = categoria;

      const response = await api.get('/produto', {
        params,
        headers: { Authorization: `Bearer ${token}` },
      });
      setProdutos(response.data);
    } catch (err) {
      console.error('Erro ao buscar produtos:', err);
      setError('Não foi possível buscar os produtos.');
    }
  };

  const handleAplicarDesconto = async () => {
    if (!desconto || parseFloat(desconto) < 0) {
      setError('Informe um valor de desconto válido');
      return;
    }
    setError('');
    setSucesso('');
    try {
      await api.patch(`/produto/desconto?nome=${nome || ''}&categoria=${categoria || ''}&desconto=${desconto}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSucesso(`Desconto de ${desconto}% aplicado com sucesso!`);
      // Opcional: atualizar lista local de produtos
      setProdutos(produtos.map(p => ({ ...p, desconto: parseFloat(desconto) })));
    } catch (err) {
      console.error('Erro ao aplicar desconto filtrado:', err);
      setError('Não foi possível aplicar o desconto.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto' }}>
      <h2>Adicionar Desconto Filtrado</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {sucesso && <p style={{ color: 'green' }}>{sucesso}</p>}

      <form onSubmit={handleBuscar} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Filtrar por nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)} style={{ marginRight: '10px' }}>
          <option value="">Todas as categorias</option>
          {categorias.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button type="submit">Buscar Produtos</button>
      </form>

      {produtos.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Produtos encontrados:</h3>
          <ul>
            {produtos.map(p => (
              <li key={p.uuid} style={{ marginBottom: '10px' }}>
                {p.nome} - {p.categoria} - Estoque: {p.quantidade} - Desconto atual: {p.desconto}%
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <label>Desconto (%)</label>
        <input
          type="number"
          step="0.01"
          value={desconto}
          onChange={(e) => setDesconto(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <button onClick={handleAplicarDesconto}>Aplicar Desconto</button>
      </div>

      <button style={{ marginTop: '20px' }} onClick={() => navigate('/produtos')}>
        Voltar
      </button>
    </div>
  );
}
