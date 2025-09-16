import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

export default function CadastrarProduto() {
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [desconto, setDesconto] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const categorias = ["PERFUME", "MAQUIAGEM", "ACESSORIO"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const token = localStorage.getItem('token');
      const produto = { nome, categoria, descricao, preco: parseFloat(preco), quantidade: parseInt(quantidade), desconto: parseFloat(desconto) };

      await api.post('/produto', produto, {
        headers: { Authorization: `Bearer ${token}` }
      });

      navigate('/produtos'); // voltar para a tela de produtos
    } catch (err) {
      console.error('Erro ao cadastrar produto:', err);
      setError('Não foi possível cadastrar o produto.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto' }}>
      <h2>Cadastrar Produto</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        <div>
          <label>Categoria:</label>
          <select value={categoria} onChange={(e) => setCategoria(e.target.value)} required>
            <option value="">Selecione</option>
            {categorias.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Descrição:</label>
          <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
        </div>
        <div>
          <label>Preço:</label>
          <input type="number" step="0.01" value={preco} onChange={(e) => setPreco(e.target.value)} required />
        </div>
        <div>
          <label>Quantidade:</label>
          <input type="number" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} required />
        </div>
        <div>
          <label>Desconto:</label>
          <input type="number" step="0.01" value={desconto} onChange={(e) => setDesconto(e.target.value)} required />
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>Cadastrar</button>
      </form>
    </div>
  );
}
