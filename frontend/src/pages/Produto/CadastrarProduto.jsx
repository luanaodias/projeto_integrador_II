import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../../api/api";

export default function CadastrarProduto() {
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [desconto, setDesconto] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const categorias = ["PERFUME", "CREME", "KIT", "BATOM"]; // categorias corretas
  const token = localStorage.getItem('token');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!nome || !categoria || !descricao || !preco || !quantidade || !desconto) {
      setError('Preencha todos os campos obrigatórios.');
      return;
    }

    const dadosProduto = {
      nome,
      categoria,
      descricao,
      preco: Number(preco),
      quantidade: parseInt(quantidade),
      desconto: Number(desconto),
    };

    try {
      await api.post('/produto', dadosProduto, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/produtos');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.mensagem || 'Não foi possível cadastrar o produto.');
    }
  };

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
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '16px',
        boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
        width: '100%',
        maxWidth: '500px',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#333' }}>Cadastrar Produto</h2>
        {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '20px' }}>{error}</p>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Nome</label>
            <input type="text" value={nome} onChange={e => setNome(e.target.value)} required style={inputStyle} />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Categoria</label>
            <select value={categoria} onChange={e => setCategoria(e.target.value)} required style={{ ...inputStyle, cursor:'pointer' }}>
              <option value="">Selecione a categoria</option>
              {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Descrição</label>
            <input type="text" value={descricao} onChange={e => setDescricao(e.target.value)} required style={inputStyle} />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Preço</label>
            <input type="number" step="any" value={preco} onChange={e => setPreco(e.target.value)} required style={inputStyle} />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Quantidade</label>
            <input type="number" step="1" value={quantidade} onChange={e => setQuantidade(e.target.value)} required style={inputStyle} />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Desconto (%)</label>
            <input type="number" step="any" value={desconto} onChange={e => setDesconto(e.target.value)} required style={inputStyle} />
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button type="submit" style={{ flex:1, padding:'12px', backgroundColor:'#6f42c1', color:'#fff', border:'none', borderRadius:'8px', fontWeight:'bold', cursor:'pointer' }}>Cadastrar</button>
            <button type="button" onClick={() => navigate('/produtos')} style={{ flex:1, padding:'12px', backgroundColor:'#555', color:'#fff', border:'none', borderRadius:'8px', fontWeight:'bold', cursor:'pointer' }}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
