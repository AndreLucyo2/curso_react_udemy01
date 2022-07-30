
import './App.css';

// 1 - Imports do router
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Pages
import Home from './pages/Home'
import About from './pages/About'

function App() {
  return (
    <div className="App">
      <h1>React router! Cabeçalho </h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </BrowserRouter>
      <h1>Rodapé</h1>
    </div>
  );
}

export default App;
