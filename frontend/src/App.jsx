import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Usuario/Login';
import Dashboard from './pages/Dashboard';

// Usuários
import Usuarios from './pages/Usuario/Usuarios';
import CadastrarUsuario from './pages/Usuario/CadastrarUsuario';
import BuscarUsuario from './pages/Usuario/BuscarUsuario';

// Produtos
import Produtos from './pages/Produto/Produtos';
import CadastrarProduto from './pages/Produto/CadastrarProduto';
import EditarProduto from './pages/Produto/EditarProduto';
import AdicionarDescontoFiltrado from './pages/Produto/AdicionarDescontoFiltrado'; // nova tela

function App() {
  return (
    <Router>
      <Routes>
        {/* Login e dashboard */}
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Usuários */}
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/usuarios/cadastrar" element={<CadastrarUsuario />} />
        <Route path="/usuarios/buscar" element={<BuscarUsuario />} />

        {/* Produtos */}
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/produtos/cadastrar" element={<CadastrarProduto />} />
        <Route path="/produtos/editar/:uuid" element={<EditarProduto />} />
        <Route path="/produtos/desconto-filtrado" element={<AdicionarDescontoFiltrado />} /> {/* rota desconto filtrado */}
      </Routes>
    </Router>
  );
}

export default App;
