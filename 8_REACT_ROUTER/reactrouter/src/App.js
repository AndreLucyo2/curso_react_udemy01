
import './App.css';

// 1 - Imports do router
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Pages
import Home from './pages/Home'
import About from './pages/About'

//Components
import Navbar from './components/Navbar';
import Product from './pages/Product';

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
          <Route path='/produts/:id' element={<Product />} />
        </Routes>
      </BrowserRouter>
      <h1>Rodapé</h1>
    </div>
  );
}

export default App;
