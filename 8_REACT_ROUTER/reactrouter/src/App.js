
import './App.css';

// 1 - Imports do router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//Pages
import Home from './pages/Home'
import About from './pages/About'

//Components
import Navbar from './components/Navbar';
import { SearchForm } from './components/SearchForm';
import Product from './pages/Product';
import Info from './pages/Info';
import NotFound from './pages/NotFound';
import Search from "./pages/Search";

function App() {
  return (
    <div className="App">
      <h1>React router! Cabeçalho </h1>
      <BrowserRouter>
        {/* 2 - links com react router*/}
        <Navbar />

        {/* 9 - search */}
        <SearchForm />
        
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          {/* 4 - rota dinamica */}
          <Route path='/products/:id' element={<Product />} />

          {/* 9 search params : cria a rota para a busca e renderiza o elemento*/}
          <Route path="/search" element={<Search />} />

          {/* 6 - nested rout - rota mais complexas */}
          <Route path='/products/:id/info' element={<Info />} />

          {/* 10 - redirecionamento de paginas: caso digitar "comany" redireciona oara about */}
          <Route path='/company' element={<Navigate to="/about" />} />

          {/* 7 - Rotas nao existentes - rota não encontrada*/}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <h1>Rodapé</h1>
    </div>
  );
}

export default App;
