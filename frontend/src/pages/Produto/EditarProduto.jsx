import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api';

export default function EditarProduto() {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState(null);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const categorias = ["PERFUME", "CREME", "KIT", "BATOM"]; // categorias corretas

  const inputStyle = {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '14px',
    backgroundColor: '#fff',
    color: '#333',
    width: '100%',
  };

  const labelStyle = {
    fontWeight: 'bold',
    marginBottom: '6px',
    display: 'block',
    color: '#333',
  };

  const formGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  };

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const response = await api.get(`/produto/${uuid}`, { headers: { Authorization: `Bearer ${token}` } });
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
      [name]: ['preco','quantidade','desconto'].includes(name) ? Number(value) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!produto.nome || !produto.categoria || !produto.descricao || produto.preco === '' || produto.quantidade === '' || produto.desconto === '') {
      setError('Preencha todos os campos obrigatórios.');
      return;
    }

    const dadosAtualizados = {
      nome: produto.nome,
      categoria: produto.categoria,
      descricao: produto.descricao,
      preco: Number(produto.preco),
      quantidade: parseInt(produto.quantidade),
      desconto: Number(produto.desconto),
    };

    try {
      await api.put(`/produto/${uuid}`, dadosAtualizados, { headers: { Authorization: `Bearer ${token}` } });
      navigate('/produtos');
    } catch (err) {
      console.error(err);
      setError('Erro ao atualizar o produto.');
    }
  };

  if (!produto) return <p style={{ color: '#fff', textAlign:'center' }}>Carregando...</p>;

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
      fontFamily:'Arial, sans-serif'
    }}>
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

      <div style={{
        backgroundColor:'#fff',
        padding:'40px',
        borderRadius:'16px',
        boxShadow:'0 8px 20px rgba(0,0,0,0.2)',
        width:'100%',
        maxWidth:'500px'
      }}>
        <h2 style={{textAlign:'center', marginBottom:'25px', color:'#333'}}>Editar Produto</h2>
        {error && <p style={{color:'red', textAlign:'center', marginBottom:'20px'}}>{error}</p>}

        <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'20px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Nome</label>
            <input type="text" name="nome" value={produto.nome} onChange={handleChange} style={inputStyle} required />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Categoria</label>
            <select name="categoria" value={produto.categoria} onChange={handleChange} style={{ ...inputStyle, cursor:'pointer' }} required>
              <option value="">Selecione a categoria</option>
              {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Descrição</label>
            <input type="text" name="descricao" value={produto.descricao} onChange={handleChange} style={inputStyle} required />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Preço</label>
            <input type="number" name="preco" step="any" value={produto.preco} onChange={handleChange} style={inputStyle} required />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Quantidade</label>
            <input type="number" name="quantidade" step="1" value={produto.quantidade} onChange={handleChange} style={inputStyle} required />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Desconto (%)</label>
            <input type="number" name="desconto" step="any" value={produto.desconto} onChange={handleChange} style={inputStyle} required />
          </div>

          <div style={{ display:'flex', gap:'10px', marginTop:'10px' }}>
            <button type="submit" style={{ flex:1, padding:'12px', backgroundColor:'#6f42c1', color:'#fff', border:'none', borderRadius:'8px', fontWeight:'bold', cursor:'pointer' }}>Salvar Alterações</button>
            <button type="button" onClick={() => navigate('/produtos')} style={{ flex:1, padding:'12px', backgroundColor:'#555', color:'#fff', border:'none', borderRadius:'8px', fontWeight:'bold', cursor:'pointer' }}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
