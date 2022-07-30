
import './App.css';

// 1 - Imports do router
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Pages
import Home from './pages/Home'
import About from './pages/About'

//Components
import Navbar from './components/Navbar';
import Product from './pages/Product';
import Info from './pages/Info';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="App">
      <h1>React router! Cabeçalho </h1>
      <BrowserRouter>
        {/* 2 - links com react router*/}
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          {/* 4 - rota dinamica */}
          <Route path='/products/:id' element={<Product />} />
          {/* 6 - nested rout - rota mais complexas */}
          <Route path='/products/:id/info' element={<Info />} />
          {/* 7 - Rotas nao existentes - rota não encontrada*/}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <h1>Rodapé</h1>
    </div>
  );
}

export default App;
