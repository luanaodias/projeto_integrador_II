import { useState } from 'react';
import api from '../api/api';
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
    <div style={{ maxWidth: '600px', margin: '50px auto' }}>
      <h2>Gerenciamento de Produtos</h2>

      <button onClick={() => navigate('/produtos/cadastrar')} style={{ marginBottom: '10px', marginRight: '10px' }}>
        Cadastrar Produto
      </button>
      <button onClick={() => navigate('/produtos/desconto-filtrado')} style={{ marginBottom: '20px' }}>
        Adicionar Desconto Filtrado
      </button>

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
          {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <button type="submit">Buscar</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {produtos.map((produto) => (
          <li key={produto.uuid} style={{ marginBottom: '15px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
            <strong>{produto.nome}</strong> <br />
            Categoria: {produto.categoria} <br />
            Descrição: {produto.descricao} <br />
            Preço: R$ {produto.preco.toFixed(2)} <br />
            Quantidade: {produto.quantidade} <br />
            Desconto: {produto.desconto.toFixed(2)}% <br />
            <button onClick={() => handleEditar(produto.uuid)} style={{ marginRight: '5px' }}>Editar</button>
            <button onClick={() => handleExcluir(produto.uuid)} style={{ marginRight: '5px' }}>Excluir</button>
            <button onClick={() => handleAumentarEstoque(produto.uuid)} style={{ marginRight: '5px' }}>+ Estoque</button>
            <button onClick={() => handleDiminuirEstoque(produto.uuid)} style={{ marginRight: '5px' }}>- Estoque</button>
            <button onClick={() => handleAtualizarDesconto(produto.uuid)}>Atualizar Desconto</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
