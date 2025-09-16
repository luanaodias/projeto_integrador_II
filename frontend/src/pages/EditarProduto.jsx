import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';

export default function EditarProduto() {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState(null);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

const categorias = ["PERFUME", "CREME", "KIT", "BATOM"];

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const response = await api.get(`/produto/${uuid}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProduto(response.data);
      } catch (err) {
        console.error(err);
        setError('Não foi possível carregar os dados do produto.');
      }
    };
    fetchProduto();
  }, [uuid, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduto({
      ...produto,
      [name]: ['preco', 'quantidade', 'desconto'].includes(name) ? Number(value) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Apenas os campos esperados pelo backend
      const dadosAtualizados = {
        nome: produto.nome,
        categoria: produto.categoria,
        descricao: produto.descricao,
        preco: parseFloat(produto.preco),
        quantidade: parseInt(produto.quantidade),
        desconto: parseFloat(produto.desconto)
      };

      await api.put(`/produto/${uuid}`, dadosAtualizados, {
        headers: { Authorization: `Bearer ${token}` }
      });

      navigate('/produtos'); // volta para lista após atualizar
    } catch (err) {
      console.error(err);
      setError('Erro ao atualizar o produto.');
    }
  };

  if (!produto) return <p>Carregando...</p>;

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto' }}>
      <h2>Editar Produto</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={produto.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Categoria:</label>
          <select
            name="categoria"
            value={produto.categoria}
            onChange={handleChange}
            required
          >
            {categorias.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Descrição:</label>
          <input
            type="text"
            name="descricao"
            value={produto.descricao || ''}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Preço:</label>
          <input
            type="number"
            name="preco"
            value={produto.preco}
            step="0.01"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Quantidade:</label>
          <input
            type="number"
            name="quantidade"
            value={produto.quantidade}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Desconto (%):</label>
          <input
            type="number"
            name="desconto"
            value={produto.desconto || 0}
            step="0.01"
            onChange={handleChange}
          />
        </div>

        <button type="submit" style={{ marginTop: '20px' }}>Atualizar Produto</button>
      </form>
    </div>
  );
}
