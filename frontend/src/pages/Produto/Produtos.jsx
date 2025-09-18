import { useState } from 'react';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';

export default function Produtos() {
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const categorias = ["PERFUME", "CREME", "KIT", "BATOM"];
  const token = localStorage.getItem('token');

  const handleBuscar = async (e) => {
    e.preventDefault();
    setError('');
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

  const handleExcluir = async (uuid) => {
    if (!window.confirm('Tem certeza que deseja excluir este produto?')) return;
    try {
      await api.delete(`/produto/${uuid}`, { headers: { Authorization: `Bearer ${token}` } });
      setProdutos(produtos.filter(p => p.uuid !== uuid));
    } catch (err) {
      console.error('Erro ao excluir produto:', err);
      setError('Não foi possível excluir o produto.');
    }
  };

  const handleEditar = (uuid) => navigate(`/produtos/editar/${uuid}`);

  const handleAumentarEstoque = async (uuid) => {
    const quantidade = parseInt(prompt("Digite a quantidade para adicionar:"));
    if (!quantidade || quantidade <= 0) return;
    try {
      await api.patch(`/produto/darEntrada/${uuid}?quantidade=${quantidade}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProdutos(produtos.map(p => p.uuid === uuid ? { ...p, quantidade: p.quantidade + quantidade } : p));
    } catch (err) {
      console.error('Erro ao aumentar estoque:', err);
      setError('Não foi possível aumentar o estoque.');
    }
  };

  const handleDiminuirEstoque = async (uuid) => {
    const quantidade = parseInt(prompt("Digite a quantidade para remover:"));
    if (!quantidade || quantidade <= 0) return;
    try {
      await api.patch(`/produto/darSaida/${uuid}?quantidade=${quantidade}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProdutos(produtos.map(p => p.uuid === uuid ? { ...p, quantidade: p.quantidade - quantidade } : p));
    } catch (err) {
      console.error('Erro ao diminuir estoque:', err);
      setError('Não foi possível diminuir o estoque.');
    }
  };

  const handleAtualizarDesconto = async (uuid) => {
    const desconto = parseFloat(prompt("Digite o novo desconto (%)"));
    if (isNaN(desconto) || desconto < 0) return;
    try {
      await api.patch(`/produto/desconto/${uuid}?desconto=${desconto}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProdutos(produtos.map(p => p.uuid === uuid ? { ...p, desconto } : p));
    } catch (err) {
      console.error('Erro ao atualizar desconto:', err);
      setError('Não foi possível atualizar o desconto.');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh', // Permite que o fundo cresça junto com a lista
        width: '99.2vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start', // Começa o conteúdo do topo
        paddingTop: '40px',
        paddingBottom: '40px',
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
          maxWidth: '700px',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#333' }}>
          Gerenciamento de Produtos
        </h2>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button
            onClick={() => navigate('/produtos/cadastrar')}
            style={{
              flex: 1,
              padding: '12px',
              backgroundColor: '#6f42c1',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: '0.3s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#5932a6')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#6f42c1')}
          >
            Cadastrar Produto
          </button>

          <button
            onClick={() => navigate('/produtos/desconto-filtrado')}
            style={{
              flex: 1,
              padding: '12px',
              backgroundColor: '#6f42c1',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: '0.3s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#5932a6')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#6f42c1')}
          >
            Adicionar Desconto Filtrado
          </button>
        </div>

        <form onSubmit={handleBuscar} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Filtrar por nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '14px',
              backgroundColor: '#fff',
              color: '#333',
            }}
          />

          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '14px',
              backgroundColor: '#fff',
              color: '#333',
              cursor: 'pointer',
            }}
          >
            <option value="">Todas as categorias</option>
            {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>

          <button
            type="submit"
            style={{
              padding: '12px 20px',
              borderRadius: '8px',
              backgroundColor: '#6f42c1',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#5932a6')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#6f42c1')}
          >
            Buscar
          </button>
        </form>

        {error && <p style={{ color: 'red', marginBottom: '20px', textAlign: 'center' }}>{error}</p>}

        <ul style={{ listStyle: 'none', padding: 0 }}>
          {produtos.map((produto) => (
            <li key={produto.uuid} style={{ marginBottom: '15px', borderBottom: '1px solid #ccc', paddingBottom: '10px', color: '#333' }}>
              <strong>{produto.nome}</strong> <br />
              Categoria: {produto.categoria} <br />
              Descrição: {produto.descricao} <br />
              Preço: R$ {produto.preco.toFixed(2)} <br />
              Quantidade: {produto.quantidade} <br />
              Desconto: {produto.desconto.toFixed(2)}% <br />

              <div style={{ marginTop: '10px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => handleEditar(produto.uuid)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    backgroundColor: '#6f42c1',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Editar
                </button>

                <button
                  onClick={() => handleExcluir(produto.uuid)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    backgroundColor: '#dc3545',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Excluir
                </button>

                <button
                  onClick={() => handleAumentarEstoque(produto.uuid)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  + Estoque
                </button>

                <button
                  onClick={() => handleDiminuirEstoque(produto.uuid)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  - Estoque
                </button>
              </div>
            </li>
          ))}
        </ul>

        <button
          onClick={() => navigate('/dashboard')}
          style={{
            padding: '12px',
            marginTop: '20px',
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
  );
}
